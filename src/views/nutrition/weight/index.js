import React from "react";

const data = [
  { id: 1, title: "ไม่เกิน 60 กก." },
  { id: 2, title: "61 - 70 กก." },
  { id: 3, title: "71 - 80 กก." },
  { id: 4, title: "81 - 90 กก." },
];

export default function WeightChoice({
  handleNext,
  setActiveColorWeight,
  activeColorWeight,
}) {
  const handleActiveColor = (id) => {
    setActiveColorWeight(id);
  };
  return (
    <div>
      <h3>1.น้ำหนักตัว ปัจจุบัน</h3>
      {data.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #EF60A3",
            borderRadius: ".5rem",
            padding: "20px",
            background: activeColorWeight === item.id ? "#FCDEEC" : "",
            marginBottom: "20px",
            cursor: "pointer",
          }}
          onClick={() => handleActiveColor(item.id)}
        >
          <h5>{item.title}</h5>
        </div>
      ))}
      <button      
        className={activeColorWeight ?  "btn_pink w-100" : "btn_gray w-100"}
        disabled={activeColorWeight ? false : true}
        onClick={handleNext}
      >
        ถัดไป
      </button>
    </div>
  );
}
