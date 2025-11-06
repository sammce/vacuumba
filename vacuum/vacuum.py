from random import randint
from time import sleep

import radio
from utime import sleep_us, ticks_us

from microbit import Image, display
from microbit import pin0 as LMotor
from microbit import pin1 as RMotor
from microbit import pin8 as RDir
from microbit import pin12 as LDir
from microbit import pin15 as USPing  # US = ultrasonic

SPEED = 450

FORWARD = 0
BACKWARD = 1

VACUUM_TIME = 5 * 60 * 1000  # 5 minutes in milliseconds


class Interface:
    START = "start_vacuum"
    CONFIRMATION = "started"
    BUSY = "already_on"
    STOP = "stop_vacuum"


class Vacuum:
    def __init__(self):
        self._direction = None
        self._set_direction(FORWARD)

        self._start_time = None

        LMotor.write_analog(0)
        RMotor.write_analog(0)

        display.show(Image.ASLEEP)

    def _set_direction(self, direction: int):
        """
        Helper function to change to direction (forwards or backwards)
        of the vacuum
        """
        if self._direction != direction:
            LDir.write_digital(direction)
            RDir.write_digital(direction)

            self._direction = direction

    def get_distance(self):
        # Send 15 microsecond pulse
        USPing.write_digital(1)
        sleep_us(15)
        USPing.write_digital(0)

        # Wait for pulse to return
        while USPing.read_digital() == 0:
            pass

        # Start time as soon as it returns
        start = ticks_us()

        # Wait for pulse to finish
        while USPing.read_digital() == 1:
            pass

        # Calculate distance
        end = ticks_us()
        cm_conversion = 10**-4
        return int((340 / 2) * (end - start) * cm_conversion)

    def straight(self):
        """
        Drive the vacuum straight forward indefinitely
        """
        self._set_direction(FORWARD)

        LMotor.write_analog(SPEED)
        RMotor.write_analog(SPEED)

    def reverse(self, duration: int):
        """
        Reverse the
        """
        self._set_direction(BACKWARD)

        display.show(Image("99999\n" * 5))

        LMotor.write_analog(900 - SPEED)
        RMotor.write_analog(900 - SPEED)

        sleep(duration)

        display.clear()

        self.stop()

    def stop(self):
        speed = 1023
        if self._direction == FORWARD:
            speed = 0

        LMotor.write_analog(speed)
        RMotor.write_analog(speed)

    def turn_random_amount(self):
        self._set_direction(FORWARD)

        turn_right = randint(0, 1)
        angle = randint(90, 180)

        if turn_right:
            LMotor.write_analog(SPEED + 150)
            RMotor.write_analog(0)
        else:
            LMotor.write_analog(0)
            RMotor.write_analog(SPEED + 150)

        sleep(angle * (1 / 180))

        self.stop()

    def vacuum(self):
        display.show(Image.HAPPY)
        self.straight()

        if self.get_distance() <= 10:
            self.reverse(1)
            self.turn_random_amount()


if __name__ == "__main__":
    radio.config(channel=59, address=0xD9EF77A2, group=171)
    radio.on()

    vacuum = Vacuum()
    vacuuming = False

    while True:
        controller_msg = radio.receive()

        if vacuuming:
            vacuum.vacuum()

        if controller_msg == Interface.START:
            if vacuuming:
                radio.send(Interface.BUSY)
            else:
                radio.send(Interface.CONFIRMATION)
                vacuuming = True
        elif controller_msg == Interface.STOP:
            vacuum.stop()
            vacuuming = False
            radio.send(Interface.CONFIRMATION)
            display.show(Image.ASLEEP)
        elif controller_msg == Interface.BUSY:
            if vacuuming:
                radio.send(Interface.CONFIRMATION)
            else:
                radio.send(":(")
