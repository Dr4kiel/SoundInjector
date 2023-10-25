import json

if __name__ == "__main__":
    inputMock = []
    for i in range(10):
        input = {
            "index": i,
            "name": "name" + str(i)
        }
        inputMock.append(input)
    print(json.dumps(inputMock))
