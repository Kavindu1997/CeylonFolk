
import React, { Component, useState, useEffect } from "react";
import { Button, FormControl } from "@material-ui/core";
import { Divider, Upload, Icon, Modal, message} from "antd";
import './Styles.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const UploadComponent = (props) => {

    const [loading, setloading] = useState(false);
    const [imageUrl, setimageUrl] = useState();

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    //   const handleChange = (info) => {
    //     if (info.file.status === 'uploading') {
    //       setloading(true );
    //       return;
    //     }
    //     if (info.file.status === 'done') {
    //       // Get this url from response in real world.
    //       getBase64(info.file.originFileObj, imageUrl =>
    //         setimageUrl(imageUrl)
    //       );
    //     }
    //   };

    const handleUpload = (info) => {
        getBase64(info.fileList[info.fileList.length - 1].originFileObj, imageUrl => {
            setloading(false)
            setimageUrl(imageUrl)
            props.setLogo(imageUrl)
            console.log('hey thash frm')

        });
        // }
      };

      
  
  
    return (
      <div>
          <FormControl className="w-75 mb-4 ml-3">
              {/* <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center"> */}
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleUpload}
                    // onChange={handleChange}
                  >
                   {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : 
                   <div style={{marginTop:'24px'}}>
                     <center>
                     <PlusOutlined />
                     </center>
                     <center>
                   
                   <div style={{ marginTop: 8 }}>Upload</div>
                   </center>
                 </div>
                   }
                    
                  </Upload>
                  <Button style={{background: 'black', color: 'white'}} onClick={props.changeLogo}>ADD</Button>
                {/* </div>
              </div> */}
            </FormControl>

            {/* <FormControl className="w-75 mb-4 ml-3">
              <div className="d-flex flex-column justify-content-center">
                <Button {...buttonSettings} onClick={this.handleExport} color="default">
                  Export T-shirt
                </Button>
              </div>
            </FormControl> */}
        
      </div>
    );
  
}

export default UploadComponent;
