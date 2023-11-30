export default function CustomButton({
  text,
  icon = null,
  width = null,
  textColor = "white",
  bgColor = null,
  border = false,
  onClickHandler = null,
}) {
  return (
    <div
      className={`flex ${width && `w-${width}`} justify-center items-center gap-2 text-${textColor} ${
        border && "border-[1px] border-white"
      } ${bgColor && `bg-${bgColor}`} py-3 px-5 rounded-3xl md:text-lg sm:text-md text-sm cursor-pointer`}
      onClick={onClickHandler}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
}
