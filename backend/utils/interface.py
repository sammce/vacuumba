from time import sleep

import serial
import serial.tools.list_ports


class MicrobitNotFoundError(Exception):
    pass


class InterfaceError(Exception):
    pass


class Interface:
    BYTE_COUNT = 50
    START = "start_vacuum"
    CONFIRMATION = "started"
    BUSY = "already_on"
    STOP = "stop_vacuum"
    GET_TEMPERATURE = "get_temperature"

    def __init__(self):
        """
        Establish connection to micro:bit via serial port.
        """
        mb_port = self.get_microbit_port()

        self.serial = serial.Serial(mb_port, baudrate=115200, bytesize=8, timeout=2)

    def send(self, msg: str) -> bool:
        """
        Send msg to the micro:bit via the serial port.
        """
        return bool(self.serial.write(msg.encode("utf-8")))

    def receive(self) -> str:
        """
        Block execution and read serial pipeline until either:
            A message is found of length Interface.BYTE_COUNT;
            The timeout limit is reached;
        """
        return self.serial.read(self.BYTE_COUNT).decode("utf-8").strip()

    def close(self) -> None:
        """
        Close the serial port connection.
        """
        self.serial.close()

    def is_vacuuming(self) -> bool:
        self.send(Interface.BUSY)
        res = self.receive()
        return res == Interface.CONFIRMATION

    def get_microbit_port(self) -> str:
        """
        Parse all available serial ports to find the microbit and
        return the serial port if found. Raise MicrobitNotFoundError if not.
        """

        ports = serial.tools.list_ports.comports()
        for port_info in ports:
            port, desc, *_ = port_info

            # Works on Mac, needs further testing for Windows
            # and Linux
            if "BBC micro:bit" in desc:
                return port

        raise MicrobitNotFoundError("No micro:bit found on serial ports.")

    def start_vacuum(self) -> bool:
        """
        Connect to the micro:bit via serial port, and instruct
        it to begin a vacuum. Return a boolean stating whether or not
        the vacuum was started successfully. False is returned if
        the vacuum is already in use.
        """

        self.send(Interface.START)
        res = self.receive()

        if res == Interface.CONFIRMATION:
            return True
        elif res == Interface.BUSY:
            return False

        raise InterfaceError("Vacuum not responding")

    def get_temperature(self) -> int:
        self.send(Interface.GET_TEMPERATURE)
        res = self.receive()

        return float(res)

    def stop_vacuum(self) -> bool:
        self.send(Interface.STOP)
        res = self.receive()

        return res == Interface.CONFIRMATION


def main():
    interface = Interface()


if __name__ == "__main__":
    main()
