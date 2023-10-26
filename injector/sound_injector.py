import threading

import pyaudio
import wave


class SoundInjector:

    def __init__(self):
        self.event = None
        self.thread = None
        self.stream = None
        self.chunk = 1024  # Record in chunks of 1024 samples
        self.sample_format = pyaudio.paInt16  # 16 bits per sample
        self.channels = 2
        self.fs = 44100  # Record at 44100 samples per second
        self.p = pyaudio.PyAudio()  # Create an interface to PortAudio
        self.cable_input_index = 0
        self.cable_output_index = []

        list_object_printed = []
        for i in range(self.p.get_device_count()):
            # list all input devices
            # format : {index: 1, name: example}
            if self.p.get_device_info_by_index(i)['maxInputChannels'] > 0:
                object_printed = {
                    'index': i,
                    'name': self.p.get_device_info_by_index(i)['name']
                }
                list_object_printed.append(object_printed)
        print(list_object_printed)

        # ask for index of cable input
        self.cable_input_index = int(input("Enter cable input index: "))

    def start(self):
        print('Recording')

        # search for cable output index
        for i in range(self.p.get_device_count()):
            if self.p.get_device_info_by_index(i)['name'].startswith("CABLE Input"):
                self.cable_output_index.append(i)

        # test with all cable output
        for i in self.cable_output_index:
            try:
                self.stream = self.p.open(format=self.sample_format,
                                          channels=self.channels,
                                          rate=self.fs,
                                          frames_per_buffer=self.chunk,
                                          input=True,
                                          output=True,
                                          input_device_index=self.cable_input_index,
                                          output_device_index=i)
                break
            except:
                print("Error with cable output index " + str(i))

        if self.stream is None:
            print("No cable output found")
            self.cable_output_index = []
            return

        # run a thread to play input to output
        self.event = threading.Event()
        self.thread = threading.Thread(
            target=self.play, args=(self.stream, self.event))
        self.thread.start()
        self.event.set()

    def stop(self):
        # Stop and close the stream
        self.stream.stop_stream()
        self.stream.close()

    def inject(self, sound_file):
        self.event.clear()
        wf = wave.open(sound_file, 'rb')
        while len(data := wf.readframes(self.chunk)):
            self.stream.write(data)
        self.event.set()

    def is_stopped(self):
        return self.stream.is_stopped()

    def play(self, stream, event):
        data = stream.read(self.chunk)
        while len(data):
            if stream.is_stopped():
                break
            stream.write(data)
            data = stream.read(self.chunk)
            event.wait()

    def close(self):
        # Terminate the PortAudio interface
        self.p.terminate()
