import pyaudio
import wave


def getSound():
    import pydub
    import numpy as np
    import sounddevice as sd

    # Charger les sons personnalisés
    son1 = pydub.AudioSegment.from_file("son1.wav")

    # Convertir les sons en tableaux NumPy
    son1_array = np.array(son1.get_array_of_samples())

    # Lire le flux audio existant
    flux_audio, frequence_echantillonnage = sd.read("flux_audio.wav")

    # Injecter le son1 à l'instant t1
    t1 = 10000  # Instant en échantillons
    flux_audio[t1:t1 + len(son1_array)] += son1_array

    # Écrire le flux audio modifié dans un fichier
    sd.write("flux_audio_modifie.wav", flux_audio, frequence_echantillonnage)


if __name__ == '__main__':
    # from app import app
    # app.run(debug=True)

    chunk = 1024  # Record in chunks of 1024 samples
    sample_format = pyaudio.paInt16  # 16 bits per sample
    channels = 2
    fs = 44100  # Record at 44100 samples per second
    seconds = 3
    filename = "output.wav"

    p = pyaudio.PyAudio()  # Create an interface to PortAudio

    print('Recording')

    stream = p.open(format=sample_format,
                    channels=channels,
                    rate=fs,
                    frames_per_buffer=chunk,
                    input=True)

    frames = []  # Initialize array to store frames

    # charger un fichier audio
    wf = wave.open('son1.wav', 'rb')

    Running = True
    # Main loop
    while Running:
        data = wf.readframes(chunk)
        stream.write(data)

    # Stop and close the stream
    stream.stop_stream()
    stream.close()
    # Terminate the PortAudio interface
    p.terminate()
