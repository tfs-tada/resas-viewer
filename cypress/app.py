import json
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
res_404 = JSONResponse(status_code=404, content={"message": "404"})
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
prefectures_error_mode = False
composition_error_mode = False


@app.get("/cypress")
def change_testmode_update(errormode: bool, composition: bool = False):
    global prefectures_error_mode
    global composition_error_mode
    if errormode == False:
        prefectures_error_mode = False
        composition_error_mode = False
    elif composition:
        prefectures_error_mode = False
        composition_error_mode = True
    else:
        prefectures_error_mode = True
        composition_error_mode = False
    return JSONResponse(status_code=200, content={"text": "set"})


@app.get("/api/v1/prefectures")
def get_pref():
    global mode
    if prefectures_error_mode == False:
        return {"result": json.load(open("fixtures/pref.json", "r"))}
    else:
        return {"result": json.load(open("fixtures/error.json", "r"))}


@app.get("/api/v1/population/composition/perYear")
def change_testmode_update(prefCode: int):
    if composition_error_mode:
        return {"result": json.load(open("fixtures/error.json", "r"))}
    if prefCode == 1:
        return {"result": json.load(open("fixtures/single_1.json", "r"))}
    if prefCode == 2:
        return {"result": json.load(open("fixtures/single_2.json", "r"))}
