import React, { useState,useEffect } from 'react'
import cn from "classnames"; 
import './AllPlatforms.css'
import { motion } from "framer-motion";

export default function AllPlatforms({ platformsTabs, defaultIndex = 0 }) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const onTabClick = (index) => {
    setActiveTabIndex(index);
  };

  // Default to a tab based on the URL hash value
  // useEffect(() => {
  //   const tabFromHash = platformsTabs.findIndex(
  //     (tab) => `#${tab.id}` === window.location.hash
  //   );
  //   setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex);
  // }, [platformsTabs, defaultIndex]);


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
    <div>
      <div className="tabs-component pt-5">
    <ul className="platform tab-links" role="tablist">
      {platformsTabs.map((tab, index) => (
        <motion.li
          key={tab.id}
          className={cn("platform tab", { active: activeTabIndex === index })}
          role="presentation"
          // variants={tabVariant}
          // animate={activeTabIndex === index ? "active" : "inactive"}
        >
          <a href={`#${tab.id}`} onClick={() => onTabClick(index)}>
            {tab.icon}
            <motion.span variants={tabTextVariant}>{tab.title}</motion.span>
          </a>
        </motion.li>
      ))}
    </ul>
    {platformsTabs.map((tab, index) => (
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
    </div>
  )
}
