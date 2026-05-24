import React from "react";

function Topbar() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div className="w-full lg:w-[620px] rounded-xl border border-blue-900/50 bg-[#071426] px-4 py-3 text-slate-400">
        Search signals, vendors, markets...
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-blue-900/50 bg-[#071426] px-4 py-3 text-sm">
          Global Enterprise Workspace
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </div>
  );
}

export default Topbar;


