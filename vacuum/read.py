import sys

try:
    from microfs import get, ls
    from samutil.formatting import Formatter as fmt
except ModuleNotFoundError:
    print("Module(s) not found. Did you forget to activate your virtual environment?")


def main(filename: str, *args):
    if filename in ls():
        get(filename)
    else:
        print(fmt.error(f"Couldn't find '{filename}' on microbit file system."))


if __name__ == "__main__":
    args = sys.argv[1::]
    main(*args)
