import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Button } from '@mui/material';
// import answer from './answerfile.yaml';



export default function AnswerForm() {

  const [values, setAllValues] = React.useState({
    // machine: '',
    OS: '',
    kubeAptVersion: '',
    docker_ip: '',
    kubproxy_apiVersion: '',
    controlPlaneEndpoint: '',
    podSubnet: '',
    serviceSubnet: '',
    kubadm_apiVersion: '',
    istioProfile: '',
    k8s_master_hostname: '',
    k8s_master_IP: '',
    k8s_ws_IP: '',
    kubectlVer: '',
    kubectlURL: '',
    calicoctlVer: '',
    calicoctlURL: '',
    istioVer: '',
    istioctlPath: '',
    helmVer: '',
    helmURL: '',
    nfsClientImage: '',
    provisionerName: '',
    nfsStorageClassName: '',
    nfsServerIP: '',
    nfsPath: '',
    minioMode: '',
    minioReplicas: '',
    minioStorageClass: '',
    minioNodeSelector: '',
    minioAccessKey: '',
    minioSecretKey: '',
    minioPersistenceSize: '',
    externaldns_pdns_api: '',
    externaldns_pdns_apikey: '',
    externaldns_loglevel: '',
    externaldns_image: '',
    pdns_image: '',
    pdns_admin_image: '',
    pdns_db_image: '',
    pdns_soa_name: '',
    pdns_soa_mail: '',
    pdns_zone: '',
    pdns_api_secret: '',
    pdns_db_secret: '',
    pdns_admin_secret: '',
    pdns_lb_ip: '',
    eckURL: '',
    cloudflareAPI: '',
    cloudflareEmail: '',
    certmanagerURL: '',
    certmanagerPlugin: '',
  });

  // const DumpYaml= require('./DumpYaml')


  const handleChange = (event) => {
    // setState(event.target.value);
    setAllValues({
      ...values, // spreading the unchanged values
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      // email: data.get('email'),
      // password: data.get('password'),
    });
  };



  React.useEffect(() => {
    fetch('http://localhost:8080/answeryaml', {
    })
      .then(
        (res) => {
        console.log("checking res.status code : " + res.status)
        if(res.status >= 400) {
          alert("server no response, error code: " + res.status)
          throw new Error("Server responds with error!")
        }
        return res.json()
    }
    )
      .then((data) => {
        console.log("loading yaml")
        console.log(data)
        setAllValues(data)
      }
       
      )
  }, []);

  function save_func(){
    console.log("save_func")
    // React.useEffect(() => {
      fetch('http://localhost:8080/updatefile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( values)
    })
  // })
  }

  



  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

      <div>
        {/* <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="machine-label">Machine Type</InputLabel>
          <Select
            // labelId="machine-select-label"
            id="machine-select"
            value={values.machine}
            label='Machine Type'
            name='machine'
            onChange={handleChange}
            required
          // autoFocus
          >
            <MenuItem value={'vmware'}>VMware</MenuItem>
            <MenuItem value={'bare_metal'}>Bare Metal</MenuItem>

          </Select>
        </FormControl> */}
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="OS-select-label">OS Type</InputLabel>
          <Select
            id="OS-select"
            value={values.OS}
            label='OS'
            name='OS'
            onChange={handleChange}
            required
          >
            <MenuItem value={'xUbuntu_20.04'}>xUbuntu_20.04</MenuItem>
            <MenuItem value={'ubuntu18'}>Ubuntu 18.04</MenuItem>
            <MenuItem value={'ubuntu20'}>Ubuntu 20.04</MenuItem>
            <MenuItem value={'cent7'}>CentOS 7</MenuItem>
            <MenuItem value={'cent8'}>CentOS 8</MenuItem>
            <MenuItem value={'debian'}>Debian</MenuItem>

          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="kubeAptVersion"
            value={values.kubeAptVersion}
            label="Kube Apt Version"
            name="kubeAptVersion"
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="docker_ip"
            value={values.docker_ip}
            label="Docker IP"
            name="docker_ip"
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="kubproxy_apiVersion-select-label">Kubernetes API Version</InputLabel>
          <Select
            // margin="normal"
            required
            fullWidth
            id="kubproxy_apiVersion"
            label="Kubernetes API Version"
            name="kubproxy_apiVersion"
            value={values.kubproxy_apiVersion}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          >
            <MenuItem value={'v1alpha1'} >V1 Alpha 1</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="controlPlaneEndpoint"
            label="Control Plane VIP address"
            name="controlPlaneEndpoint"
            value={values.controlPlaneEndpoint}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="podSubnet"
            label="Kubernetes Pod network pod subnet"
            name="podSubnet"
            value={values.podSubnet}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="serviceSubnet"
            label="Kubernetes Pod network service subnet"
            name="serviceSubnet"
            value={values.serviceSubnet}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="kubadm_apiVersion-select-label">Kubeadm API Version</InputLabel>
          <Select
            // margin="normal"
            required
            fullWidth
            id="kubadm_apiVersion"
            label="Kubeadm API Version"
            name="kubadm_apiVersion"
            value={values.kubadm_apiVersion}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          >
            <MenuItem value={'v1beta2'} >V1 Beta 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="istioProfile"
            label="Istio profile"
            name="istioProfile"
            value={values.istioProfile}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="k8s_master_hostname"
            label="Kubernetes master hostname"
            name="k8s_master_hostname"
            value={values.k8s_master_hostname}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="k8s_master_IP"
            label="Kubernetes master IP"
            name="k8s_master_IP"
            value={values.k8s_master_IP}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="k8s_ws_IP"
            label="Kubernetes WS IP"
            name="k8s_ws_IP"
            value={values.k8s_ws_IP}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="kubectlVer-select-label">Kubectl Version</InputLabel>
          <Select
            // margin="normal"
            required
            fullWidth
            id="kubectlVer"
            label="Kubectl Version"
            name="kubectlVer"
            value={values.kubectlVer}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          >
            <MenuItem value={'v1.20.7'} >V1.20.7</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="kubectlURL"
            label="Kubectl URL"
            name="kubectlURL"
            value={values.kubectlURL}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="calicoctlVer-select-label">Calicoctl Version</InputLabel>
          <Select
            // margin="normal"
            required
            fullWidth
            id="calicoctlVer"
            label="Calicoctl version"
            name="calicoctlVer"
            value={values.calicoctlVer}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          >
            <MenuItem value={'v3.16.1'} >v3.16.1</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="calicoctlURL"
            label="Calicoctl URL"
            name="calicoctlURL"
            value={values.calicoctlURL}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="istioVer-select-label">Istio Version</InputLabel>
          <Select
            // margin="normal"
            required
            fullWidth
            id="istioVer"
            label="Istio version"
            name="istioVer"
            value={values.istioVer}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          >
            <MenuItem value={'1.7.2'} >1.7.2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="istioctlPath"
            label="Istio control path"
            name="istioctlPath"
            value={values.istioctlPath}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="helmVer-select-label">Helm Version</InputLabel>
          <Select
            // margin="normal"
            required
            fullWidth
            id="helmVer"
            label="Helm version"
            name="helmVer"
            value={values.helmVer}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          >
            <MenuItem value={'v3.3.4'} >v3.3.4</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="helmURL"
            label="Helm URL"
            name="helmURL"
            value={values.helmURL}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="nfsClientImage"
            label="NFS Client Image"
            name="nfsClientImage"
            value={values.nfsClientImage}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="provisionerName"
            label="Provisioner name"
            name="provisionerName"
            value={values.provisionerName}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="nfsStorageClassName"
            label="NFS Storage Class Name"
            name="nfsStorageClassName"
            value={values.nfsStorageClassName}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="nfsServerIP"
            label="NFS Server IP"
            name="nfsServerIP"
            value={values.nfsServerIP}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="nfsPath"
            label="NFS Path"
            name="nfsPath"
            value={values.nfsPath}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioMode"
            label="Min IO Mode"
            name="minioMode"
            value={values.minioMode}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioReplicas"
            label="Min IO Replicas"
            name="minioReplicas"
            value={values.minioReplicas}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioStorageClass"
            label="Min IO Storage Class"
            name="minioStorageClass"
            value={values.minioStorageClass}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioNodeSelector"
            label="Min IO Node Selector"
            name="minioNodeSelector"
            value={values.minioNodeSelector}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioAccessKey"
            label="Min IO Access Key"
            name="minioAccessKey"
            value={values.minioAccessKey}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioSecretKey"
            label="MinIO Secret Key"
            name="minioSecretKey"
            value={values.minioSecretKey}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="minioPersistenceSize"
            label="Min IO Persistance Size"
            name="minioPersistenceSize"
            value={values.minioPersistenceSize}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="externaldns_pdns_api"
            label="OpenDNS + External DNS API"
            name="externaldns_pdns_api"
            value={values.externaldns_pdns_api}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="externaldns_pdns_apikey"
            label="OpenDNS + External DNS API key"
            name="externaldns_pdns_apikey"
            value={values.externaldns_pdns_apikey}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="externaldns_loglevel"
            label="External DNS Log Level"
            name="externaldns_loglevel"
            value={values.externaldns_loglevel}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="externaldns_image"
            label="External DNS Image"
            name="externaldns_image"
            value={values.externaldns_image}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_image"
            label="OpenDNS Image"
            name="pdns_image"
            value={values.pdns_image}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_admin_image"
            label="OpenDNS Admin Image"
            name="pdns_admin_image"
            value={values.pdns_admin_image}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_db_image"
            label="OpenDNS Database image"
            name="pdns_db_image"
            value={values.pdns_db_image}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_soa_name"
            label="OpenDNS SOA Name"
            name="pdns_soa_name"
            value={values.pdns_soa_name}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_soa_mail"
            label="OpenDNS SOA Mail"
            name="pdns_soa_mail"
            value={values.pdns_soa_mail}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_zone"
            label="OpenDNS Zone"
            name="pdns_zone"
            value={values.pdns_zone}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_api_secret"
            label="OpenDNS API Secret"
            name="pdns_api_secret"
            value={values.pdns_api_secret}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_db_secret"
            label="OpenDNS Database Secret"
            name="pdns_db_secret"
            value={values.pdns_db_secret}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_admin_secret"
            label="OpenDNS Admin Secret"
            name="pdns_admin_secret"
            value={values.pdns_admin_secret}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="pdns_lb_ip"
            label="OpenDNS lb IP"
            name="pdns_lb_ip"
            value={values.pdns_lb_ip}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="eckURL"
            label="ECK URL"
            name="eckURL"
            value={values.eckURL}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="cloudflareAPI"
            label="Cloudflare API"
            name="cloudflareAPI"
            value={values.cloudflareAPI}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="cloudflareEmail"
            label="Cloudflare Email"
            name="cloudflareEmail"
            value={values.cloudflareEmail}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="certmanagerURL"
            label="Cert Manager URL"
            name="certmanagerURL"
            value={values.certmanagerURL}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2, minWidth: 120 }}>
          <TextField
            // margin="normal"
            required
            fullWidth
            id="certmanagerPlugin"
            label="Cert Manager Plugin"
            name="certmanagerPlugin"
            value={values.certmanagerPlugin}
            onChange={handleChange}
          // autoComplete="email"
          // autoFocus
          />
        </FormControl>
      </div>

      <Box textAlign='center' margin={2}>
        {/* <Button variant="outlined" onClick={() => load_func()}>Load Yaml File</Button> */}
        <Button variant="outlined" onClick={() => save_func(values)}>Update Yaml File</Button>
      </Box>

    </Box>

  );
}
