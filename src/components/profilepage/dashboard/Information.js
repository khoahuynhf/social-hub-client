import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postUpdateInfo, getUpdateInfo, connectFacebook } from '../../../actions/auth';
import FacebookLogin from 'react-facebook-login';
class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      phone: "",
      email: ""
    };

  }

  componentDidMount() {
    this.props.getUpdateInfo(() => {
      if (this.props.update) {
        const { address, phone, email } = this.props.update;
        this.setState({ address, phone, email })
      }
    });
    
  }

  responseFacebook = (response) => {    
    if (response.id) {
      const data = {
        facebookID: response.id
      }
      this.props.connectFacebook(data);
      return alert('kết nối facebook thành công');
    }
    alert('kết nối thất bại, hãy thử lại sau');
  }


  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.postUpdateInfo(this.state);
  }

  render() {
    const { ID, FullName, Faculty, Major, Class, Academic_year, BirthDate } = this.props.auth.profile;
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-12">
                    <label htmlFor="hoten">
                      <h6>Họ tên sinh viên</h6>
                    </label>
                    <input
                      name="hoten"
                      className="form-control"
                      type="text"
                      disabled
                      value={FullName}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Mã Số Sinh Viên</h6>
                    </label>
                    <input
                      name="txtTenHoatDong"
                      className="form-control"
                      type="text"
                      disabled
                      value={ID}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="txtTenHoatDong">
                      <h6>Ngày Sinh</h6>
                    </label>
                    <input
                      name="txtTenHoatDong"
                      className="form-control"
                      type="text"
                      disabled
                      value={BirthDate}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="phone">
                      <h6>Điện Thoại</h6>
                    </label>
                    <input
                      name="phone"
                      className="form-control"
                      type="text"
                      defaultValue={this.props.update && this.props.update.phone}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="email">
                      <h6>Email</h6>
                    </label>
                    <input
                      name="email"
                      className="form-control"
                      type="email"
                      defaultValue={this.props.update && this.props.update.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address">
                      <h6>Địa Chỉ</h6>
                    </label>
                    <input
                      name="address"
                      className="form-control"
                      type="text"
                      defaultValue={this.props.update && this.props.update.address}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card mb-1">
                <div className="form-row m-1 card-body">
                  <div className="col-6">
                    <label htmlFor="txtFaculty">
                      <h6>Khoa</h6>
                    </label>
                    <input
                      name="txtFaculty"
                      className="form-control"
                      id="txtKhoa"
                      type="text"
                      value={Faculty}
                      disabled
                    />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="txtMajor">
                      <h6>Ngành</h6>
                    </label>
                    <input
                      name="txtMajor"
                      className="form-control"
                      id="txtNganh"
                      type="text"
                      value={Major}
                      disabled
                    />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="txtClass">
                      <h6>Lớp</h6>
                    </label>
                    <input
                      name="txtClass"
                      className="form-control"
                      id="txtLop"
                      type="text"
                      value={Class}
                      disabled
                    />
                  </div>
                  <div className=" col-6">
                    <label htmlFor="txtACADEMIC_YEAR">
                      <h6>Khóa</h6>
                    </label>
                    <input
                      name="txtACADEMIC_YEAR"
                      className="form-control"
                      id="txtLop"
                      type="text"
                      value={Academic_year}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link
                  className="btn btn-myapp mr-1"
                  name="btnChangePassword"
                  type="button"
                  to="./changepassword"
                  replace
                >Đổi Mật Khẩu</Link>

                <input
                  className="btn btn-myapp3"
                  name="btnUpdateNewInfo"
                  type="submit"
                  value="Lưu lại thông tin"
                />
                <FacebookLogin
                  appId="839052703122702"
                  autoLoad={false}
                  fields="name,email,picture"
                  textButton="Kết nối facebook"                  
                  callback={this.responseFacebook}
                  cssClass="btn btn-primary ml-1"
                  icon="fa-facebook"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    update: state.update
  }
}

export default connect(mapStateToProps, { postUpdateInfo, getUpdateInfo, connectFacebook })(Information);
