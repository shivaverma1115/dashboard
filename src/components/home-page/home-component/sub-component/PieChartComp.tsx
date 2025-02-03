"use client"
import { PieChartOption } from '@/interFace/interFace';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
const PieChartComp = () => {

  const [categoryChart, setCategoryChart] = useState<any>([])
  const [selllsChart, setselllsChart] = useState<any>([])

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}success/best-category-chart`)
      .then((res) => {
        setselllsChart(res.data.sells)
        setCategoryChart(res.data.categories)
      })
      .catch(e => console.log(e))
  }, [])


  const option: PieChartOption = {
    series: selllsChart,
    chart: {
      width: 350,
      type: "donut"
    },
    labels: categoryChart,
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient"
    },
    colors: ["#6F4EF6", "#5BC5A8", "#FF9720"],
    responsive: [
      {
        breakpoint: 2200,
        options: {
          chart: {
            width: 315,
            height: 500
          },
          legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 400,
            height: 500
          },
          legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 575,
        options: {
          chart: {
            width: '100%',
            height: 420
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  }
  return (
    <>
      <ReactApexChart options={option} series={option.series} type="pie" width="100%" height="300px" />
    </>
  );
};

export default PieChartComp;