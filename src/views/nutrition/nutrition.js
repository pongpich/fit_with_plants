import React, { useEffect, useState, useMemo } from "react";
import "./nutrition.scss";
import WeightChoice from "./weight";
import ArrowBack from "../../assets/img/arrow_back.png";
import FoodSource from "./foodSource";
import ControlProblem from "./control_problem";
import IconNutrition from "../../assets/img/icon_Nutrition.png";
import IconCarb from "../../assets/img/icon_Carb.png";
import IconProtein from "../../assets/img/icon_protein.png";
import IconFat from "../../assets/img/icon_fat.png";
import IconSuggest from "../../assets/img/icon_suggest.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getNutritionFood,
  createNutritionFood,
  clearNutritionFood,
} from "../../redux/nutrition";
import { Table } from "reactstrap";
import LoadingComponent from "../../components/loading";

/* Demo */
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const columnsNutrients = [
  { id: 1, title: "สารอาหาร" },
  { id: 2, title: "ปริมาณ" },
  { id: 3, title: "หน่วย" },
];

const columnsCarb = [
  // { id: 1, title: "ประเภทอาหาร" },
  { id: 2, title: "ชื่ออาหาร" },
  { id: 3, title: "ปริมาณชั่งตวง" },
];

const columnsProtein = [
  // { id: 1, title: "ประเภทอาหาร" },
  { id: 2, title: "ชื่ออาหาร" },
  { id: 3, title: "ปริมาณชั่งตวง" },
];

const columnsFat = [
  // { id: 1, title: "ประเภทอาหาร" },
  { id: 2, title: "ชื่ออาหาร" },
  { id: 3, title: "ปริมาณชั่งตวง" },
];

function Nutrition() {
  const user = useSelector(({ authUser }) => (authUser ? authUser.user : ""));
  const { nutritionFoods, statusPostNutritionFood, statusGetNutritionFood } =
    useSelector(({ nutrition }) => (nutrition ? nutrition : []));
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [isStartStep, setIsStartStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(33.33);
  const [activeColorWeight, setActiveColorWeight] = useState("");
  const [activeColorFood, setActiveColorFood] = useState("");
  const [cSelected, setCSelected] = useState([]);
  const [rowsNutrients, setRowsNutrients] = useState([]);
  const [rowsCarb, setRowsCarb] = useState([]);
  const [rowsProtein, setRowsProtein] = useState([]);
  const [rowsFat, setRowsFat] = useState([]);
  const [rowsDiet, setRowsDiet] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setProgress((prev) => (activeStep == 2 ? 100 : prev + 33.33));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setProgress((prev) => prev - 33.33);
  };

  const handleCalculateAgain = () => {
    setIsStartStep(true);
    setActiveStep(0);
    setProgress(33.33);
    setActiveColorWeight("");
    setActiveColorFood("");
    setCSelected([]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getNutritionFood(user && user.user_id));
  }, []);

  useEffect(() => {
    if (statusPostNutritionFood === "success") {
      dispatch(getNutritionFood(user && user.user_id));
    }
    if (statusGetNutritionFood === "success") {
      dispatch(clearNutritionFood());
    }
  }, [statusPostNutritionFood, statusGetNutritionFood]);

  useEffect(() => {
    if (activeStep === 3) {
      dispatch(
        createNutritionFood(
          user && user.user_id,
          activeColorWeight.toString(),
          activeColorFood,
          cSelected
        )
      );
    }
  }, [activeStep]);

  useMemo(() => {
    try {
      if (nutritionFoods.length > 0) {
        setRowsNutrients(JSON.parse(nutritionFoods[0]?.current_weight));
        setRowsCarb(JSON.parse(nutritionFoods[0]?.daily_food));
        setRowsProtein(JSON.parse(nutritionFoods[0]?.daily_food));
        setRowsFat(JSON.parse(nutritionFoods[0]?.daily_food));
        setRowsDiet(JSON.parse(nutritionFoods[0]?.diet_problems));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [nutritionFoods]);
  console.log("statusGetNutritionFood", statusGetNutritionFood);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {statusGetNutritionFood !== "success" &&
        isLoading &&
        activeStep === 3 &&
        statusPostNutritionFood === "loading" && <LoadingComponent />}

      {rowsNutrients.length == 0 && !isStartStep && activeStep !== 3 ? (
        <div className="card_calculate">
          <h3 className="title">เริ่มโปรแกรมคำนวณอาหาร</h3>
          <button className="btn_pink" onClick={() => setIsStartStep(true)}>
            คำนวณ
          </button>
        </div>
      ) : null}

      {isStartStep && activeStep !== 3 ? (
        <div className="container-sm">
          <br />
          <div className="mb-5">
            <div
              className="progress2"
              role="progressbar"
              aria-label="Basic example"
            >
              <div
                className={`progress-bar`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ margin: "0 60px" }}
            >
              <img
                src={ArrowBack}
                style={{
                  width: "10px",
                  height: "10px",
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                }}
                alt="arrow"
                onClick={activeStep === 0 ? () => {} : handleBack}
              />

              {activeStep !== 3 ? (
                <h6 style={{ color: "#7A7A7A" }}>
                  {activeStep + 1} / {steps.length}
                </h6>
              ) : null}
            </div>
          </div>
          {activeStep === 0 && (
            <WeightChoice
              handleNext={handleNext}
              activeColorWeight={activeColorWeight}
              setActiveColorWeight={setActiveColorWeight}
            />
          )}
          {activeStep === 1 && (
            <FoodSource
              handleNext={handleNext}
              activeColorFood={activeColorFood}
              setActiveColorFood={setActiveColorFood}
            />
          )}
          {activeStep === 2 && (
            <ControlProblem
              handleNext={handleNext}
              setCSelected={setCSelected}
              cSelected={cSelected}
              setIsStartStep={setIsStartStep}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      ) : null}

      {rowsNutrients.length > 0 && !isStartStep ? (
        <div className="container-sm">
          <div>
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconNutrition}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <h3 className="mt-2">สารอาหารที่แนะนำ</h3>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <Table striped>
                <thead>
                  <tr style={{ background: "#EF60A3", color: "white" }}>
                    {columnsNutrients.map((item) => (
                      <th className="text-center" key={item.id}>
                        {item.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsNutrients.map((item, i) => (
                    <tr
                      key={i}
                      className="text-center"
                      style={{ background: i === 0 ? "#E8E8E8" : "" }}
                    >
                      <td>{item.title_carb}</td>
                      <td>{item.carb}</td>
                      <td>{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
                <tbody>
                  {rowsNutrients.map((item, i) => (
                    <tr
                      key={i}
                      className="text-center"
                      style={{ background: "white" }}
                    >
                      <td>{item.title_protein}</td>
                      <td>{item.protein}</td>
                      <td>{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
                <tbody>
                  {rowsNutrients.map((item, i) => (
                    <tr
                      key={i}
                      className="text-center"
                      style={{ background: i === 0 ? "#E8E8E8" : "" }}
                    >
                      <td>{item.title_fat}</td>
                      <td>{item.fat}</td>
                      <td>{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconCarb}
                alt="demo"
                style={{ width: 50, height: 50, marginRight: "20px" }}
              />
              <div>
                <h3 className="mt-3">ประเภทอาหารที่แนะนำ (คาร์โบไฮเดรต)</h3>
                <span style={{ color: "red", fontSize: "16px" }}>
                  **ปริมาณชั่งตวงที่แนะนำ นับเป็น 1 ส่วน
                </span>
              </div>
            </div>

            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <Table striped>
                <thead>
                  <tr style={{ background: "#EF60A3", color: "white" }}>
                    {columnsCarb.map((item) => (
                      <th className="text-center" style={{width: "50%"}} key={item.id}>
                        {item.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsCarb
                    .filter((item) => item.food_type === "คาร์โบไฮเดรต")
                    .map((item, i) => (
                      <tr
                        key={i}
                        className="text-center"
                        style={{ background: i === 0 ? "#E8E8E8" : "" }}
                      >
                        {/* <td>{item.food_type}</td> */}
                        <td>{item.food_name}</td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconProtein}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />

              <div>
                <h3 className="mt-2">ประเภทอาหารที่แนะนำ (โปรตีน)</h3>
                <span style={{ color: "red", fontSize: "16px" }}>
                  **ปริมาณชั่งตวงที่แนะนำ นับเป็น 1 ส่วน
                </span>
              </div>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <Table striped>
                <thead>
                  <tr style={{ background: "#EF60A3", color: "white" }}>
                    {columnsProtein.map((item) => (
                      <th className="text-center" style={{width: "50%"}} key={item.id}>
                        {item.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsProtein
                    .filter((item) => item.food_type === "โปรตีน")
                    .map((item, i) => (
                      <tr
                        key={i}
                        className="text-center"
                        style={{ background: i === 0 ? "#E8E8E8" : "" }}
                      >
                        {/* <td>{item.food_type}</td> */}
                        <td>{item.food_name}</td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconFat}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <div>
                <h3 className="mt-2">ประเภทอาหารที่แนะนำ (ไขมัน)</h3>
                <span style={{ color: "red", fontSize: "16px" }}>
                  **ปริมาณชั่งตวงที่แนะนำ นับเป็น 1 ส่วน
                </span>
              </div>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <Table striped md={2}>
                <thead>
                  <tr style={{ background: "#EF60A3", color: "white" }}>
                    {columnsFat.map((item) => (
                      <th className="text-center" key={item.id} style={{width: "50%"}}>
                        {item.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsFat
                    .filter((item) => item.food_type === "ไขมัน")
                    .map((item, i) => (
                      <tr
                        key={i}
                        className="text-center"
                        style={{ background: i === 0 ? "#E8E8E8" : "" }}
                      >
                        {/* <td>{item.food_type}</td> */}
                        <td>{item.food_name}</td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4">
              <img
                src={IconSuggest}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <h3 className="mt-2">คำแนะนำ</h3>
            </div>
            <div
              style={{
                background: "#FFF8FB",
                padding: "50px",
                marginTop: "20px",
                borderRadius: "1rem",
              }}
            >
              <h5>{rowsDiet.map((item) => item.suggest).join(", ")}</h5>
            </div>

            <div className="d-flex align-items-center justify-content-center mt-3">
              <button className="btn_pink" onClick={handleCalculateAgain}>
                คำนวณใหม่
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Nutrition;
