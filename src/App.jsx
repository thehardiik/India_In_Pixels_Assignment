import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import map from './file.json';
import { CgCloseR } from "react-icons/cg";
import { geoPath } from "d3-geo";
import * as topojson from "topojson-client";

//
import ap from './maps/andhraPradesh.json';
import ar from './maps/arunachalpradesh.json';
import as from './maps/assam.json';
import br from './maps/bihar.json';
import ct from './maps/chhattisgarh.json';
import ga from './maps/goa.json';
import gj from './maps/gujarat.json';
import hr from './maps/haryana.json';
import hp from './maps/himachalpradesh.json';
import jh from './maps/jharkhand.json';
import ka from './maps/karnataka.json';
import kl from './maps/kerala.json';
import mp from './maps/madhyapradesh.json';
import mh from './maps/maharashtra.json';
import mn from './maps/manipur.json';
import ml from './maps/meghalaya.json';
import mz from './maps/mizoram.json';
import nl from './maps/nagaland.json';
import or from './maps/odisha.json';
import pb from './maps/punjab.json';
import rj from './maps/rajasthan.json';
import sk from './maps/sikkim.json';
import tn from './maps/tamilnadu.json';
import tg from './maps/telangana.json';
import tr from './maps/tripura.json';
import up from './maps/uttarpradesh.json';
import ut from './maps/uttarakhand.json';
import wb from './maps/westbengal.json';

// Union Territories
import an from './maps/andamanNicobar.json';
import dl from './maps/delhi.json';
import jk from './maps/jammukashmir.json';
import la from './maps/ladakh.json';
import ld from './maps/lakshadweep.json';


export default function App() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedState, setSelectedState] = useState(null); 
  const [projectionConfig, setProjectionConfig] = useState({ scale: 950, center: [80, 22] });
  const [stateCenter, setStateCenter] = useState(null)
  const [stateScale, setStateScale] = useState(null)
  const [stateName,setStateName] = useState("");
  const [districtTooltipContent, setDistrictTooltipContent] = useState("");
  const [districtTooltipPosition, setDistrictTooltipPosition] = useState("");

  const handleMouseEnter = (geo) => {
    setTooltipContent(geo.properties.ST_NM);
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleMouseMove = (event) => {
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };

  const handleStateMouseEnter = (geo) => {
    setTooltipContent(geo.properties.district);
  };


  const handleClick = (event, geo) => {
    event.stopPropagation(); // Stop event from propagating
    setStateCenter(null)
    
    switch (geo.properties.ID) {
      case "AP":
        calculateBound(ap, "andhra-pradesh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ap);
        break;
    
      case "AR":
        calculateBound(ar, "arunachal-pradesh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ar);
        break;
    
      case "AS":
        calculateBound(as, "assam");
        setStateName(geo.properties.ST_NM);
        setSelectedState(as);
        break;
    
      case "BR":
        calculateBound(br, "bihar");
        setStateName(geo.properties.ST_NM);
        setSelectedState(br);
        break;
    
      case "CT":
        calculateBound(ct, "chhattisgarh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ct);
        break;
    
      case "GA":
        calculateBound(ga, "goa");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ga);
        break;
    
      case "GJ":
        calculateBound(gj, "gujarat");
        setStateName(geo.properties.ST_NM);
        setSelectedState(gj);
        break;
    
      case "HR":
        calculateBound(hr, "haryana");
        setStateName(geo.properties.ST_NM);
        setSelectedState(hr);
        break;
    
      case "HP":
        calculateBound(hp, "himachal-pradesh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(hp);
        break;
    
      case "JH":
        calculateBound(jh, "jharkhand");
        setStateName(geo.properties.ST_NM);
        setSelectedState(jh);
        break;
    
      case "KA":
        calculateBound(ka, "karnataka");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ka);
        break;
    
      case "KL":
        calculateBound(kl, "kerala");
        setStateName(geo.properties.ST_NM);
        setSelectedState(kl);
        break;
    
      case "MP":
        calculateBound(mp, "madhya-pradesh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(mp);
        break;
    
      case "MH":
        calculateBound(mh, "maharashtra");
        setStateName(geo.properties.ST_NM);
        setSelectedState(mh);
        break;
    
      case "MN":
        calculateBound(mn, "manipur");
        setStateName(geo.properties.ST_NM);
        setSelectedState(mn);
        break;
    
      case "ML":
        calculateBound(ml, "meghalaya");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ml);
        break;
    
      case "MZ":
        calculateBound(mz, "mizoram");
        setStateName(geo.properties.ST_NM);
        setSelectedState(mz);
        break;
    
      case "NL":
        calculateBound(nl, "nagaland");
        setStateName(geo.properties.ST_NM);
        setSelectedState(nl);
        break;
    
      case "OR":
        calculateBound(or, "odisha");
        setStateName(geo.properties.ST_NM);
        setSelectedState(or);
        break;
    
      case "PB":
        calculateBound(pb, "punjab");
        setStateName(geo.properties.ST_NM);
        setSelectedState(pb);
        break;
    
      case "RJ":
        calculateBound(rj, "rajasthan");
        setStateName(geo.properties.ST_NM);
        setSelectedState(rj);
        break;
    
      case "SK":
        calculateBound(sk, "sikkim");
        setStateName(geo.properties.ST_NM);
        setSelectedState(sk);
        break;
    
      case "TN":
        calculateBound(tn, "tamil-nadu");
        setStateName(geo.properties.ST_NM);
        setSelectedState(tn);
        break;
    
      case "TG":
        calculateBound(tg, "telangana");
        setStateName(geo.properties.ST_NM);
        setSelectedState(tg);
        break;
    
      case "TR":
        calculateBound(tr, "tripura");
        setStateName(geo.properties.ST_NM);
        setSelectedState(tr);
        break;
    
      case "UP":
        calculateBound(up, "uttar-pradesh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(up);
        break;
    
      case "UT":
        calculateBound(ut, "uttarakhand");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ut);
        break;
    
      case "WB":
        calculateBound(wb, "west-bengal");
        setStateName(geo.properties.ST_NM);
        setSelectedState(wb);
        break;
    
      // Union Territories
      case "AN":
        calculateBound(an, "andaman-and-nicobar");
        setStateName(geo.properties.ST_NM);
        setSelectedState(an);
        break;
    
      case "DL":
        calculateBound(dl, "delhi");
        setStateName(geo.properties.ST_NM);
        setSelectedState(dl);
        break;
    
      case "JK":
        calculateBound(jk, "jammu-kashmir");
        setStateName(geo.properties.ST_NM);
        setSelectedState(jk);
        break;
    
      case "LA":
        calculateBound(la, "ladakh");
        setStateName(geo.properties.ST_NM);
        setSelectedState(la);
        break;
    
      case "LD":
        calculateBound(ld, "lakshadweep");
        setStateName(geo.properties.ST_NM);
        setSelectedState(ld);
        break;
    
      default:
        break;
    }
     // Set the selected state
  };

  const calculateBound = (map, key) => {
    const geojsonFeatureCollection = topojson.feature(map, key);
    const path = geoPath();
    const bounds = path.bounds(geojsonFeatureCollection);
    const [[x0, y0], [x1, y1]] = bounds;

  // Calculate center and dimensions
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    const scale = 0.9 / Math.max((x1 - x0) / 800, (y1 - y0) / 600);
    setStateScale(scale*40)
    setStateCenter([centerX, centerY])
  }

  return (
    <div 
      className="w-[100vw] h-[100vh] flex flex-col items-center  relative bg-white overflow-x-hidden"
      onClick={() => setSelectedState(null)}>
      <div className="h-[10vh] w-full flex flex-row justify-between items-center  border-b-[1px] shadow-[rgba(0,0,0,0.1)_0px_5px_6px_0px]">
        <p className="ml-5 text-xl font-semibold ">India In Pixels</p>
      </div>
      <div className="w-[120vh] [@media(max-width:550px)]:w-[100vw] h-[90vh] [@media(max-width:550px)]:h-[85vw] relative">
        {/* Parent div sets width to 100% of its container and keeps a fixed aspect ratio (75%) */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          viewBox="0 0 800 600" // Define viewBox for aspect ratio
          className="w-full h-full absolute mt-2"
        >
          <Geographies geography={map}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onClick={(event) => handleClick(event, geo)}
                  className="hover:cursor-pointer"
                  style={{
                    default: {
                      fill: selectedState && selectedState.rsmKey === geo.rsmKey ? "#F53" : "#0096FF",
                      stroke: selectedState ? "#89CFF0" : "#000",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }

            
          </Geographies>
        </ComposableMap>
      </div>

      
      {/*State Component */}
      
      {selectedState && (
        <div 
          className="h-[70vh] w-[45vw] border-[1px] border-gray-200 absolute bg-white shadow-lg rounded-lg z-[10] [@media(max-width:550px)]:w-[100vw]"
          onClick={(e) => e.stopPropagation()}>
          <div className="h-[10vh] w-[45vw] flex flex-row justify-between items-center absolute border-b-[1px] [@media(max-width:550px)]:w-[100vw]">
            <p className="ml-5 font-semibold">{stateName}</p>
            <button 
              className="text-red-700 text-2xl hover:cursor-pointer mr-5 z-[20]"
              onClick={() => setSelectedState(null)}><CgCloseR /></button>
            
          </div>
          <div className="w-[45vw] h-[70vh] relative mt-5 [@media(max-width:550px)]:w-[100vw] [@media(max-width:550px)]:h-[85vw]">
              <ComposableMap
                projection="geoMercator"
                projectionConfig= {{ scale: stateScale, center: stateCenter}}
                viewBox="0 0 800 600" // Define viewBox for aspect ratio
                className="w-full h-full absolute"
              >
              <Geographies geography={selectedState}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => handleStateMouseEnter(geo)}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                      className="hover:cursor-pointer"
                      style={{
                        default: {
                          fill: "#0096FF",
                          stroke: "#89CFF0",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }

              </Geographies>
              </ComposableMap>
          </div>
        </div>
      )}

      { tooltipContent && (
          <div
            className={`absolute  bg-[#000000b3] text-white p-[5px]  rounded-[5px] text-sm z-[10]`}
            style={{
              top: `${tooltipPosition.y + 10}px`,
              left: `${tooltipPosition.x + 10}px`,
            }}
          >
            {tooltipContent}
          </div>
      )}
    </div>
  );
}
