import sys
from pprint import pprint


def get_word_frequency(filename: str) -> dict:  # {word: frequency}
    frequency_dict = {}

    with open(filename, "r") as file:
        for word in file.read().lower().split():
            existing_freq = frequency_dict.get(word)

            if existing_freq:
                frequency_dict[word] = existing_freq + 1
                continue

            frequency_dict[word] = 1

    return frequency_dict


if __name__ == "__main__":
    args = sys.argv[1::]

    if len(args) > 0:
        filename = args[0]
    else:
        filename = input("Enter file to read: ")

    pprint(get_word_frequency(filename))
