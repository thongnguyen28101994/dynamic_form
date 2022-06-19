import React, { Component } from 'react'
import PropTypes from 'prop-types';
import '../../css/header.css';
import bg from '../../images/bg.png';
import Logo from '../../images/Logo.png'
const Header = () => {
    return (
        <div className="container">
            <div className="item1">
                <div className="left">
                    <div id="logo">
                        <a href="*">
                            <img src={Logo} />
                        </a>
                    </div>
                    <div id="titleBanner">
                        <div id="titleSo">
                            <span id="lb_tenso">SỞ GD&ĐT THÀNH PHỐ HỒ CHÍ MINH</span>
                        </div>
                        <div id="titleHTTT">
    <span>{`${JSON.parse(sessionStorage.getItem('session')).TenTruong} - ${JSON.parse(sessionStorage.getItem('session')).Name}`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item2"></div>
            <div className="item3">
                <div className="right">
                    <div id="nenBannerRight">
                        <img src={bg} />
                    </div>
                    <div className="HeadMenu">
                        <ul>
                            <li><a href="https://www.facebook.com/qicorphethongthongtin" target="_blank"><span>Hỏi đáp(f)</span></a></li>
                            <li><a href="https://huongdan.quangich.com" target="_blank"><span>Hướng dẫn</span></a></li>
                            <li><a href="https://quangich.com/sanpham/he-thong-thong-tin-giao-duc.aspx" target="_blank"><span>Giới thiệu</span></a></li>
                        </ul>
                    </div>
                    <div className="navigation">
                        Giải pháp đột phá trong đổi mới quản lý giáo dục và đào tạo
                </div>
                </div>
            </div>
        </div>
    );
};


export default Header;
