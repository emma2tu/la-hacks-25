
export default function Home() {
  return (
    <div>
      <div className="w-[1440px] h-[917px] relative bg-white overflow-hidden">
        <div className="flex justify-center items-center mt-40">
          <img
            src="/research_copilot_logo.png"
            alt="Research Copilot"
            width={150}
            height={150}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-[810.41px] h-20 left-[315.59px] top-[284.34px] absolute text-center justify-start text-black text-6xl font-semibold font-['Inter']">Research Copilot</div>
        <div className="w-[810.41px] h-20 left-[314px] top-[361.41px] absolute text-center justify-start"><span className="text-black text-2xl font-semibold font-['Inter']">Literature reviews made easy. <br />Built by researchers,</span><span className="text-black text-2xl font-semibold font-['Inter']"> </span><span className="text-blue-900 text-2xl font-semibold font-['Inter']">for </span><span className="text-blue-900 text-2xl font-semibold font-['Inter']">researchers</span><span className="text-slate-600 text-2xl font-semibold font-['Inter']">.</span></div>
        <div className="w-52 h-9 left-[1230px] top-[33px] absolute text-center justify-start text-black text-xl font-semibold font-['Inter']">Learn more</div>
        {/* <div className="w-28 h-24 left-[662.79px] top-[189px] absolute bg-black"></div> */}
        {/* <div className="w-40 h-32 left-[634.83px] top-[153.24px] absolute bg-gradient-to-b from-slate-900 to-slate-600"></div> */}
        <div className="w-[1293px] h-[1236px] left-[766px] top-[299px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(104,_159.77,_220.86,_0.68)_0%,_rgba(255,_255,_255,_0)_100%)] rounded-full"></div>
        <div className="w-[1293px] h-[1236px] left-[-630px] top-[-687px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(104,_159.77,_220.86,_0.68)_0%,_rgba(255,_255,_255,_0)_100%)] rounded-full"></div>
        <div className="w-80 h-24 left-[547.59px] top-[447.22px] absolute bg-white rounded-xl border-[0.79px] border-zinc-500"></div>
        <div className="w-56 h-7 left-[591.29px] top-[461.52px] absolute justify-start text-black text-sm font-normal font-['Inter']">Find me papers about... </div>
        <div className="w-36 h-12 left-[1262px] top-[22px] absolute rounded-[34px] border border-black"></div>
      </div>
    </div>
  );
}
