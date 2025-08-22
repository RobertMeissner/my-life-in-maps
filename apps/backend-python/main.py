from fastapi import FastAPI
from granian import Granian

app = FastAPI()


if __name__ == '__main__':
    Granian(...).serve()