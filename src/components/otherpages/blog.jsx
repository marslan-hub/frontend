// import useState hook to create menu collapse state
import React, {useState} from 'react';
import logo from "../../assets/images/logo.png";

// import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
// import icons from react icons
import {
  FiLogOut,
} from 'react-icons/fi';
// import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import './header.css';
const Blog = () => {
  // create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [stateActive, setSetActive] = useState(1);
  // create a custom function that will change menucollapse state from false to true and true to false
  //   const menuIconClick = () => {
  //     // condition checking to change state from true to false and vice versa
  //     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  //   };
  return (
    <>
     <nav className="navbar bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
              alt="logo"
              className="mt-2 mb-2"
              src={logo}
              width={200}
              height={130}
          />
        </a>
      </div>
    </nav>
      <div id="headerParent" className="d-flex flex-row mb-3">
        <div id="header" className="p-1">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                {/* small and big change using menucollapse state */}
                <p>{menuCollapse ? 'Logo' : 'BLOG'}</p>
              </div>
              {/* <div className="closemenu" onClick={menuIconClick}> */}
              {/* changing menu collapse icon on click */}
              {/* {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />} */}
              {/* </div> */}
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem
                  active={stateActive==1?true:false}
                  onClick={()=>setSetActive(1)}
                //   icon={<FiHome />}
                >
              Eco Friendly waterless Car wash
                </MenuItem>
                <MenuItem
                  active={stateActive==2?true:false}
                  onClick={()=>setSetActive(2)}
                //   icon={<FaList />}
                >Interior cleaning | Steam wash</MenuItem>
                {/* <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem> */}
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              {/* <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
              </Menu> */}
            </SidebarFooter>
          </ProSidebar>
        </div>
        <div className='p-1'>
          {stateActive==1?
          <div>
            <h2>Eco Friendly waterless Car wash</h2>

            <h5>What is water-less car wash</h5>
            <p>A water–less car wash is an eco-friendly and efficient car washing  that
                uses little or no water. Sometimes it is also known as a spray  wash
                It also allows the car detailer to service your car in narrow spaces
                while saving surprising amounts of water. Water-less products are
                more advanced than regular soap used for a mobile car wash as they
                need to compensate for the lack of water. Thus, the efficiency of the water-less
                wash is usually better than using water-based methods. Plus, when doing a water-less car detailing, you only need a bucket of water to rinse your towels instead of using between 50 to 100 gallons of clean water when using a pressure washer or a hose.
                A water-less car wash just requires 4 – 6 oz of water-less  wash formula used per car and a couple of buckets of water. In the cases where the car is caked in mud, you require an additional gallon of water.
            </p>
            <h5>How does a Water-less Car Wash work?</h5>
            <p>A water-less car wash uses high lubricity sprays to polish and wash the
                vehicle’s bodywork. The spray’s high lubricity chemicals encapsulate dirt
                 and dust particles. This process is similar to how water removes dirt,
                  but the chemical combination of a water-less car wash
                  product is more efficient. You have to simply spray the surface of the car
                   and then wipe it off. This process removes any light dirt
                   or stains from the car’s surface. It works ideally for
                   cars that don’t have thick dried mud to clean. A
                   water-less wash is only recommended for cars with light dirt.
                    Eco-Friendly Car Washing: The Waterless Way</p>
            <p>  A car wash can get expensive, but it doesn’t have to be that way. If you’re looking to save money and the environment, then read on for all the information you need about how to waterless car wash your vehicle, so you can enjoy the same shiny-clean look without wasting all that water. The best part? You don’t even need any special equipment to do it!</p>
            <h5>What is an eco-friendly car wash?</h5>
            <p>
            Eco friendly car washing is an innovative way to clean your vehicle without water. They utilize environmentally conscious products, such as recycled water, recyclable buckets and biodegradable soaps in order to minimize their impact on Mother Earth. Plus, they’re convenient! No need to find a home car wash Dubai or eco-friendly auto spa; these car washes can be found right in your own driveway.
            </p>
            <h5>Why is it a good idea to use an eco-friendly car wash?</h5>
            <p>Cleaning your car using an eco-friendly method has many benefits. If you are looking to lower your carbon footprint or if you simply want to care for our planet, waterless car wash is a great way to do it.</p>
            <h5>What are the benefits of using an eco-friendly car wash?
            </h5>
            <p>Admittedly, a waterless car wash can’t offer quite as deep a clean. However, it also leaves no residue, it doesn’t require you to use hundreds of gallons of water and it won’t pollute local waterways. If that doesn’t make you want to switch your cleaning habits, we don’t know what will!</p>
            <h5>How do you go about getting your own eco-friendly vehicle?
            </h5>
            <p>If you want to start car washing on your own, follow these steps and you’ll be ready to clean up in no time! First, identify what kind of car wash service you want to run. Do you want a one stop shop for all things auto? If so, take some classes at a trade school or community college where they can teach you how to perform oil changes, tire rotations and other basic automotive maintenance.
            </p>
            <h5>Where can you find more information on using eco-friendly waterless cars?</h5>
            <p>In any country, we don’t want to see our water resources dwindling away or getting polluted. If your customers are drivers, who have to car wash from time to time, let them know that there is a safe and effective way for cleaning your vehicle without wasting water. Simply start by getting a home car wash in Dubai, as it offers all necessary accessories for fast and easy care of your vehicle at home.</p>
          </div>:
            ''}
          {stateActive==2?
          <div>
            <h4>
            Interior cleaning | Steam wash
            </h4>
            <h4>What is steam wash ?</h4>
            <p>Interior steam wash is a method that uses hot pressurized water to clean, sanitize and disinfect even those dirtiest of surfaces and fabrics on your car.
                Interior Cleaning Steam Wash: The Ultimate Home Service
                Interior cleaning steam wash is the ultimate home service available in Dubai today. Using the latest cleaning methods, this service can leave your home spotless and sparkling clean in no time at all.</p>
            <h4>Reasons why you should get your car cleaned?</h4>
            <p>It is a fact that a dirty car interior can negatively affect your car’s performance and even make it unsafe to drive. Interior cleaning should be done regularly to remove dirt, prevent buildup of mold and mildew, as well as reduce unpleasant odors.</p>
            <h4>How does the interior cleaning process take place?</h4>
            <p>A steam cleaner is used to power wash, degrease and disinfect your vehicle’s interior.</p>
            <h4>What should I do if I want my seats to be cleaned?</h4>
            <p>If you have children, pets or are regularly exposed to stains on your car’s interior, you should clean your car’s interior at least once a week.</p>
            <h4>Do you clean the trunk?</h4>
            <p>Yes, we will clean your car interior steam wash and keep it smelling fresh too. We also provide regular maintenance to your car by performing a thorough cleaning of both your leather and fabric interiors to remove dust and allergens.</p>
            <h4>What is included in the interior steam cleaning package?</h4>
            <ul>
              <li>Leather cleaning and conditioning, </li>
              <li> Carpet & upholstery deodorizing and stain removal, </li>
              <li> Specialty carpet care such as shampoo/extraction of pet stains, etc.</li>
            </ul>
          </div>:
            ''}
        </div>
      </div>
    </>
  );
};
export default Blog;
