import radio

from microbit import display, temperature, uart


class Interface:
    BYTE_COUNT = 50
    START = "start_vacuum"
    CONFIRMATION = "started"
    BUSY = "already_on"
    STOP = "stop_vacuum"
    GET_TEMPERATURE = "get_temperature"

    def __init__(self):
        uart.init(baudrate=115200, bits=8, stop=1)

    def normalize_message(self, msg: str) -> str:
        """
        Pad msg to a length of Interface.BYTE_COUNT so that
        messages via serial port are always the same length
        """
        return msg + " " * (self.BYTE_COUNT - len(msg))

    def send(self, msg: str) -> bool:
        """
        Write msg to the serial port connection
        """
        return bool(uart.write(self.normalize_message(msg)))

    def receive(self):
        """
        Receive and convert any bytes on the pipeline to str, and return the string.
        Return None if there's no message present.
        """
        if uart.any():
            content = uart.read(self.BYTE_COUNT)
            return str(content, "utf-8").strip()  # Remove redundant whitespace


def main():
    radio.config(channel=59, address=0xD9EF77A2, group=171)
    radio.on()

    interface = Interface()
    forward_to_interface_messages = [Interface.BUSY, Interface.CONFIRMATION]
    forward_to_radio_messages = [Interface.START, Interface.STOP, Interface.BUSY]

    while True:
        controller_msg = interface.receive()
        vacuum_msg = radio.receive()

        if controller_msg in forward_to_radio_messages:
            radio.send(controller_msg)

        if vacuum_msg in forward_to_interface_messages:
            interface.send(vacuum_msg)

        if controller_msg == Interface.GET_TEMPERATURE:
            temp = temperature()
            interface.send(str(temp if temp else 21))


if __name__ == "__main__":
    main()
