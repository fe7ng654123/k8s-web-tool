import * as React from 'react';
import { useState, useEffect } from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { color, keys, positions } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Button } from '@mui/material';
import answer_values from './answer_values.json'
import Logo1 from "./image/VMware_vsphere.png";
import Logo2 from "./image/Bare_metal.png";




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  // const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function VerticalTabs() {


  const [value, setValue] = React.useState(0);

  const [values, setAllValues] = React.useState(
    answer_values
  );

  const [hostlist, setList] = React.useState(
    {
   
    }
  );

  const [DClist, setDClist] = React.useState(
    {
   
    }
  );

  const [clusterlist, setcluster] = React.useState(
    {
   
    }
  );

  const handleChange_tab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setAllValues({
      ...values, // spreading the unchanged values
      [event.target.name]: event.target.value
    })
    // console.log(values)
  };

  const [show, setShow] = useState(true)


  function testVMConnection() {
    console.log(`host:${values.vcenter_host} username:${values.username} password:${values.password}`);
    fetch('http://localhost:8080/testconnection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(
        (res) => {
          console.log("checking res.status code : " + res.status)
          if (res.status >= 400) {
            alert("server no response, error code: " + res.status)
            throw new Error("Server responds with error!")
          }
          return res.json()
        }).then((data) => {
          console.log("below is data")
          console.log(data)
          // setAllValues(data)
          if (data.statusCode == 201) {
            console.log('cooollllll');
            
            getHostList();
          } else console.log('noooooo')
        }
        );

  }

  function getHostList() {
    fetch('http://localhost:8080/host', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      (res) => {
        console.log("checking res.status code : " + res.status)
        if (res.status >= 400) {
          alert("server no response, error code: " + res.status)
          throw new Error("Server responds with error!")
        }
        return res.json()
      }).then((data) => {
        console.log("below is data")
        console.log(data.value[0]['name'])
        data.value.forEach((ele,i)=>{
          console.log(i)
          console.log(ele['host'])
          hostlist[i]=ele['host']
        })
        setList({...hostlist});
        console.log(hostlist)
      }
      );
  }

  function getDCList() {
    fetch('http://localhost:8080/datacenter', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      (res) => {
        console.log("checking res.status code : " + res.status)
        if (res.status >= 400) {
          alert("server no response, error code: " + res.status)
          throw new Error("Server responds with error!")
        }
        return res.json()
      }).then((data) => {
        console.log("below is data")
        console.log(data.value[0]['name'])
        data.value.forEach((ele,i)=>{
          console.log(i)
          console.log(ele['name']+":"+ele['datacenter'])
          DClist[i]=ele['name'] + ":"+ ele['datacenter']
        })
        setDClist({...DClist});
        console.log(DClist)
      }
      );
  }

  function getCluster() {
    fetch('http://localhost:8080/cluster', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      (res) => {
        console.log("checking res.status code : " + res.status)
        if (res.status >= 400) {
          alert("server no response, error code: " + res.status)
          throw new Error("Server responds with error!")
        }
        return res.json()
      }).then((data) => {
        console.log("below is data")
        console.log(data.value[0]['name'])
        data.value.forEach((ele,i)=>{
          console.log(i)
          console.log(ele['name']+":"+ele['cluster'])
          clusterlist[i]=ele['name'] + ":"+ ele['cluster']
        })
        setcluster({...clusterlist});
        console.log(clusterlist)
      }
      );
  }

  React.useEffect(() => {
    // Run! Like go get some data from an API.
    console.log('huh?');
    getDCList();
    getCluster();
  }, []);

  return (
    <Box
      // sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        centered={false}
        onChange={handleChange_tab}
        aria-label="Vertical tabs example"
        sm={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="01.   Machine Information" {...a11yProps(0)} />
        <Tab label="02.   Node Information" {...a11yProps(1)} />
        <Tab label="03.   OS Type" {...a11yProps(2)} />
        <Tab label="04.   Kubernetes" {...a11yProps(3)} />
        <Tab label="05.   kubernetes - Network / Ingress" {...a11yProps(4)} />
        <Tab label="06.   Kubernetes - DNS" {...a11yProps(5)} />
        <Tab label="07.   Kubernetes - Storage" {...a11yProps(6)} />
        <Tab label="08.   Kubernetes - Monitoring" {...a11yProps(7)} />
        <Tab label="09.   Kubernetes - Logging" {...a11yProps(8)} />
        <Tab label="10.   DevOps - CI/CD" {...a11yProps(9)} />
        <Tab label="11.   Identity Service" {...a11yProps(10)} />
        <Tab label="12.   Backup / Restore Tools" {...a11yProps(11)} />
        <Tab label="13.   Demo Data" {...a11yProps(12)} />
        <Tab label="14.   Summary" {...a11yProps(13)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box sx={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}>
          <Typography component='h4' variant='h5' align='left' >
            Choose Machine Information
          </Typography>
          <Typography component='h4' variant='body2' align='left' >
            Please fill-in machine information for the deployment
          </Typography>
        </Box>
        <div>
          <Button><img src={Logo1} width="225" height="225" /></Button>
          <Button><img src={Logo2} width="225" height="225" /></Button>
        </div>

        <div>
          <Button varient="outlined" onClick={() => setShow(true)}>vCenter</Button>
          <Button varient="outlined" onClick={() => setShow(false)}>ESXi</Button>
        </div>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            required
            fullWidth
            id="vcenter_host"
            label="Address"
            name="vcenter_host"
            value={values.vcenter_host}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </FormControl>

        <div>
          <Button varient="contained" onClick={() => testVMConnection()}>
            Test Connection
          </Button>
          (Display error message if any)
        </div>


        {
          show ? <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
            {/* <TextField
          fullWidth
          id="target_datacenter"
          label="Target Datacenter"
          name="target_datacenter"
          value={values.target_datacenter}
          onChange={handleChange}
        /> */}
            <InputLabel id='DC-select'>Target Datacenter</InputLabel>
            <Select
              id="DC-select"
              value={values.DC}
              label='Target Datacenter'
              name='DC'
              onChange={handleChange}
              required
            >
              {/* <MenuItem value={'xUbuntu_20.04'}>xUbuntu_20.04</MenuItem> */}
              {/* <MenuItem value={'ubuntu18'}>Ubuntu 18.04</MenuItem> */}
              {Object.entries(DClist).map((ele, i) => {
                // console.log(ele[1]);
                return <MenuItem key={ele[1]} value={ele[1]}>{ele[1]}</MenuItem>;
              })}

              {/* return {<MenuItem value={'ubuntu1'}>?? 18.04</MenuItem>}  */}

            </Select>
          </FormControl> : null
        }


        {
          show ? <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
            

            <InputLabel id='DC-select'>Target cluster</InputLabel>
            <Select
              id="target_cluster"
              value={values.target_cluster}
              label='Target Cluster'
              name='target_cluster'
              onChange={handleChange}
              required
            >
              {Object.entries(clusterlist).map((ele, i) => {
                // console.log(ele[1]);
                return <MenuItem key={ele[1]} value={ele[1]}>{ele[1]}</MenuItem>;
              })}

            </Select>
          </FormControl> : null
        }

        {
          show ?
            <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
              <TextField
                fullWidth
                id="target_resource_pool"
                label="Target Resource Pool (if any)"
                name="target_resource_pool"
                value={values.target_resource_pool}
                onChange={handleChange}
              />
            </FormControl> : null
        }
        {
          show ?
            <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
              <TextField
                fullWidth
                id="vm_folder"
                label="VM Folder (if any)"
                name="vm_folder"
                value={values.vm_folder}
                onChange={handleChange}
              />
            </FormControl> : null
        }

        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            fullWidth
            id="vm_guest_port_group"
            label="VM Guest Port Group"
            name="vm_guest_port_group"
            value={values.vm_guest_port_group}
            onChange={handleChange}
          />
        </FormControl>

        <Button varient="contained" style={{ float: 'right' }} onClick={() => this.handleClick()}>
          Continue &gt;
        </Button>


      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
