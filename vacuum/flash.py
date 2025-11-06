import sys

try:
    from samutil.formatting import ColorCodes
    from samutil.formatting import Formatter as fmt
    from uflash import find_microbit, flash
except ModuleNotFoundError:
    print("Module(s) not found. Did you forget to activate your virtual environment?")

ALLOWED_FILES = ["vacuum", "controller", "compass"]


def main(*args):
    if len(args) > 0:
        filename = args[0]
    else:
        filename = input(
            fmt.magenta("What file would you like to flash? ")
            + fmt.bold(fmt.info("(vacuum/controller/compass)"))
            + fmt.magenta(": ")
        )

    assert filename in ALLOWED_FILES, fmt.error(
        f"Forbidden file {fmt.bold(fmt.underline(f'{filename}.py'))}"
    )

    flash(f"{filename}.py")

    print(
        fmt.success(
            f"Successfully flashed {fmt.underline(fmt.bold(filename) + f'{ColorCodes.UNDERLINE + ColorCodes.GREEN + ColorCodes.BOLD}.py')}{ColorCodes.GREEN} to microbit (at {fmt.underline(find_microbit())}{ColorCodes.GREEN})"
        )
    )


if __name__ == "__main__":
    args = sys.argv[1::]
    main(*args)
