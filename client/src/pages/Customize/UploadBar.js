// import React, { useState, useEffect } from 'react';
// import { Button, FormControl } from '@material-ui/core';
// import { Divider, Upload, Icon, Modal } from "antd";

// const [imageUrlUpload, setImageUrlUpload] = useState('');
// const [loading, setLoading] = useState('');

// const handleUpload = (info) => {
//     getBase64(info.fileList[info.fileList.length - 1].originFileObj, imageUrl => {
//         setImageUrlUpload(imageUrl)
//         setLoading(false)
//         props.setLogo(imageUrl)
//     });
//     // }
//   };

// const Customize = (props) => {
//     return(
//         <FormControl>
//             <div>
//             <Upload
//                     name="avatar"
//                     listType="picture-card"
//                     className="avatar-uploader align"
//                     showUploadList={false}
//                     beforeUpload={() => false}
//                     onChange={handleUpload}
//                   >
//                     {imageUrl ? (
//                       <img className="img-fluid" src={imageUrl} alt="avatar" />
//                     ) : (
//                       <div>
//                         <Icon type={this.state.loading ? "loading" : "plus"} />
//                         <div className="ant-upload-text">Upload IMG</div>
//                       </div>
//                     )}
//                   </Upload>
//                 </div>
//                 <Button
//                   {...buttonSettings}
//                   onClick={() => this.handleLogoEffects("noImg")}
//                   variant="outlined"
//                   color="secondary"
//                 >
//                   Remove Image
//                 </Button>

//         </FormControl>

//         );
// }

// export default Customize;