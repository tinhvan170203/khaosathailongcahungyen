import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './index.css'
import MenuChildrent from './MenuChildrent';


const MenuParent = ({groupName, iconGroup, options}) => {
  return (
    <div className='w-full cursor-pointer'>
       <Accordion sx={[{boxShadow: '0'},
       {
        '&:hover': {
          color: 'black',
        },
      },]} defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: 'black', fontSize: "18px"}}/>}
        //   aria-controls="panel1a-content"
        //   id="panel1a-header"
        // sx={{padding: '0px 0', margin: '0 0', minHeight: "auto"}}
        sx={[
          {
            '&':{padding: '0px 0', margin: '0 0', minHeight: "auto"}
          }
      ]}
        >
        <div className='flex space-x-2 items-end pl-2'>
            {iconGroup}
            <span className='text-[14px] font-semibold'>{groupName}</span>
        </div>
        </AccordionSummary>
        <AccordionDetails sx={{padding: "0 0", margin: "0"}}>
          {options?.length > 0 && options.map(option => 
            <MenuChildrent option={option} key={option.name}/>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default MenuParent
