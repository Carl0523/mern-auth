export default function FormCard({ children }) {
  return (
    <div className="flex flex-col items-center lg:w-[40%] md:w-[60%] sm:w-[75%] w-[90%] mx-auto mt-40 mb-10 p-10 bg-secondary rounded-xl">
      {children}
    </div>
  );
}
