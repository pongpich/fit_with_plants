import * as React from "react";

const data = [
  {
    id: 1,
    title: "ร้านอาหารทั่วไป, อาหารตามสั่ง, ข้าวแกง",
    titleEng: "general_restaurant",
  },
  {
    id: 2,
    title: "ร้านสะดวกซื้อ, อาหารกล่อง, อาหารสำเร็จรูป",
    titleEng: "convenience_store",
  },
  { id: 3, title: "ประกอบอาหารทานเอง", titleEng: "cooking_self" },
];

export default function FoodSource({
  handleNext,
  activeColorFood,
  setActiveColorFood,
}) {
  const handleActiveColor = (titleEng) => {
    setActiveColorFood(titleEng);
  };
  return (
    <div>
      <h3>2. อาหารประจำวันของคุณมาจากแหล่งใด เป็นส่วนใหญ่</h3>
      {data.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #EF60A3",
            borderRadius: ".5rem",
            padding: "20px",
            background: activeColorFood === item.titleEng ? "#FCDEEC" : "",
            marginBottom: "20px",
            cursor: "pointer",
          }}
          onClick={() => handleActiveColor(item.titleEng)}
        >
          <h5>{item.title}</h5>
        </div>
      ))}
      <button
        className={activeColorFood ?  "btn_pink w-100" : "btn_gray w-100"}
        disabled={activeColorFood ? false : true}
        onClick={handleNext}
      >
        ถัดไป
      </button>
    </div>
  );
}
