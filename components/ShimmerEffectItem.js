import React from 'react'

const ShimmerEffectItem = () => {
  return (
    <div className="rounded-md p-4 w-full">
        <div className="flex animate-pulse space-x-4">
            <div className=" rounded-2xl bg-slate-200 h-[90px] w-[90px]"></div>
            <div className="flex-1 space-y-6 py-1">
            <div className="h-5 rounded bg-slate-200 rounded"></div>
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-slate-200"></div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ShimmerEffectItem
