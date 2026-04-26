import Image from "next/image";

export default function Home(){
  return (
      <div className="bg-bg min-h-screen p-8">
          <Image className="w-full flex justify-center"
              src="/logo.png"
              alt="munchi"
              width={1400}
              height={400}
                 priority

          />
          <p className="font-body text-noir text-sm mt-2 flex justify-center">
              eliminate food waste on campus
          </p>
      </div>
  );
}
