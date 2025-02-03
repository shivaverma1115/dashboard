import React from 'react';
import PieChartComp from './PieChartComp';

const PieChart = () => {
    return (
        <>
            <div className="col-span-12 xl:col-span-12 lg:col-span-6 lg:mb-5">
                  <div className="cashier-dashboard-piechart bg-white rounded-lg mb-5 p-7 pt-5 lg:mb-0 pt-6 pb-4 lg:h-full">
                  <h5 className="text-[18px] text-bold font-bold maxSm:mb-2 text-heading">Piechart Report</h5>
                    <div id="chartPie" className="text-center">
                        <PieChartComp/>
                    </div>
                  </div>
                </div>
        </>
    );
};

export default PieChart;