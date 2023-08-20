import React, { useState,useEffect } from 'react'
import cn from "classnames"; 
import './AllCategories.css'
import './AllCategoriesResponsive.css'
import { motion } from "framer-motion";

export default function AllCategories({ tabs, defaultIndex = 0 }) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const onTabClick = (index) => {
    setActiveTabIndex(index);
  };

  //Dynamically Changing CSS Variables to change the value of our --active-color variable whenever the activeIndex state changes
  // useEffect(() => {
  //   document.documentElement.style.setProperty(
  //     "--active-color",
  //     tabs[activeTabIndex].color
  //   );
  // }, [activeTabIndex, tabs]);

  //variants for list
  // const tabVariant = {
  //   active: {
  //     width: "55%",
  //     transition: {
  //       type: "tween",
  //       duration: 0.4
  //     }
  //   },
  //   inactive: {
  //     width: "15%",
  //     transition: {
  //       type: "tween",
  //       duration: 0.4
  //     }
  //   }
  // };

  //variants for span
  const tabTextVariant = {
    active: {
      opacity: 1,
      x: 0,
      display: "block",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3
      }
    },
    inactive: {
      opacity: 0,
      x: -30,
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.1
      },
      transitionEnd: { display: "none" }
    }
  };
  return (
    
      <div className="tabs-component pt-5">
    <ul className="tab-links row" role="tablist">
      {tabs.map((tab, index) => (
        <motion.li
          key={tab.id}
          className={cn("tab col-md-1 col-sm-4", { active: activeTabIndex === index })}
          role="presentation"
          // variants={tabVariant}
          // animate={activeTabIndex === index ? "active" : "inactive"}
        >
          <a href={`#${tab.id}`} onClick={() => onTabClick(index)}>
            {tab.icon}
            <motion.span variants={tabTextVariant} className='tab-title'>{tab.title}</motion.span>
          </a>
        </motion.li>
      ))}
    </ul>
    {tabs.map((tab, index) => (
			<tab.content
				// role="tabpanel"
		    //id={tab.id}
				key={tab.id}
        id={`${tab.id}-content`}
        active={activeTabIndex === index}
		    //className={cn("tab-content", { active: activeTabIndex === index })}
			// >
      // {tab.content}
			/>
    ))}
  </div>
    
  )
}
