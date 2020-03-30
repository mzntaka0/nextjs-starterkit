import React, {useState, useEffect} from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

let bizcharts;
  if (process.browser) {
  bizcharts = require('bizcharts');
}


const DocumentStats = () => {
  const data = [
    {
      year: "Jan",
      sales: 38
    },
    {
      year: "Feb",
      sales: 52
    },
    {
      year: "Mar",
      sales: 61
    },
    {
      year: "Apr",
      sales: 145
    },
    {
      year: "May",
      sales: 48
    },
    {
      year: "Jun",
      sales: 38
    },
    {
      year: "Jul",
      sales: 38
    },
    {
      year: "Aug",
      sales: 38
    },
    {
      year: "Sep",
      sales: 38
    },
    {
      year: "Oct",
      sales: 38
    },
    {
      year: "Nov",
      sales: 38
    },
    {
      year: "Dec",
      sales: 38
    },
  ];
  const cols = {
    sales: {
      tickInterval: 20
    }
  };
  const [isBrowser, setIsBrower] = useState<boolean>(false)
  useEffect(
    () => {
      if (process.browser) {
        setIsBrower(true)
      }
    },
      [process.browser]
  )
  return (
    <>
			<Chart width={800} height={300} data={data} scale={cols}>
				<Axis name="year" />
				<Axis name="sales" />
				<Tooltip
					crosshairs={{
						type: "y"
					}}
				/>
				<Geom type="interval" position="year*sales" />
			</Chart>
		</>
  )
}

export default DocumentStats
