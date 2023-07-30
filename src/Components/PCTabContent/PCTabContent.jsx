import React from 'react'
import { motion} from "framer-motion"


export default function PCTabContent({list,itemVariants}) {
  return (
    <div>
      <div className="row gy-5">
                    {list.map((game,index)=>{
                      return <motion.div className="col-lg-4" variants={itemVariants} initial="hidden" animate={itemVariants.visible ? "visible": "hidden"} custom={index +1 * 0.1}>
                      <div class="card mx-2">
                        <img class="card-img-top" src={game.thumbnail} alt=""></img>
                        <div class="card-body">
                        <h5 class="card-title">{game.title}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                  </div>
                                </div>
                      </motion.div>
                    })}
                  </div>
    </div>
  )
}
