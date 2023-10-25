from sound_injector import SoundInjector as inj
import os


COMMAND_CODE_CLOSE = 0x0
COMMAND_CODE_START = 0x1
COMMAND_CODE_STOP = 0x2
COMMAND_CODE_PLAY = 0x4
COMMAND_CODE_LIST = 0x8

class console:
    def run(self):
        print("console run")

        injector = inj()

        while True:
            command = input("Enter command: ")
            command_code = self.interpret(command)
            if command_code is not None:
                if command_code == COMMAND_CODE_CLOSE:
                    print("Close")
                    if injector is not None:
                        injector.stop()
                    injector.close()
                    break
                elif command_code == COMMAND_CODE_START:
                    print("Start")
                    injector.start()
                elif command_code == COMMAND_CODE_STOP:
                    print("Stop")
                    injector.stop()
                elif command_code == COMMAND_CODE_PLAY:
                    print("Starting to play" + command[4:])
                    if os.path.isfile("sounds/" + command[5:].strip() + ".wav"):
                        injector.inject("sounds/" + command[5:].strip() + ".wav")
                    else:
                        print("File not found")
                elif command_code == COMMAND_CODE_LIST:
                    print("List")
                    for file in os.listdir("sounds"):
                        print(file)

            else:
                print("Unknown command")

    def interpret(self, command):
        if command.startswith("close"):
            return COMMAND_CODE_CLOSE
        elif command.startswith("start"):
            return COMMAND_CODE_START
        elif command.startswith("stop"):
            return COMMAND_CODE_STOP
        elif command.startswith("play"):
            return COMMAND_CODE_PLAY
        elif command.startswith("list"):
            return COMMAND_CODE_LIST


if __name__ == '__main__':
    console = console()
    console.run()