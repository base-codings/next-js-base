import { Container, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import useStoreGlobal from '~/store/useStoreGlobal';

interface Props {
  caption: string;
  description: string;
  phone1: string;
  phone2: string;
  phone3: string;
  appStoreUrl: string;
  googlePlayUrl: string;
  appStoreQr: string;
  googlePlayQr: string;
  isStorePage?: boolean;
}

const UI: React.FC<Props> = ({
  caption,
  description,
  phone1,
  phone2,
  phone3,
  appStoreQr,
  googlePlayQr,
  appStoreUrl,
  googlePlayUrl,
  isStorePage,
}) => {
  return (
    <Container className="flex items-center w-full max-w-[1250px]">
      <div className="flex items-center lg:items-start flex-col flex-1 gap-[21px] lg:gap-[35px]">
        <div className="flex flex-col lg:flex-row items-center gap-[16px]">
          <img src="/logo.png" className="h-[57px] lg:h-[80px] object-contain" />
          {isStorePage && (
            <Typography
              sx={(theme) => ({
                color: theme.palette.primary.main,
                fontWeight: 700,
              })}
            >
              Tải App
              <br className="lg:block hidden" /> Cửa Hàng
            </Typography>
          )}
        </div>
        <Typography
          sx={(theme) => ({
            color: theme.palette.primary.main,
            fontWeight: 700,
          })}
          className="text-center lg:text-left max-w-[306px] lg:max-w-none text-[16px] lg:text-[24px] leading-[25px] lg:leading-[33px] mt-[29px] lg:mt-0"
        >
          {caption}
        </Typography>
        <Typography className="max-w-[300px] lg:max-w-none leading-[25px] lg:leading-[33px] text-[14px] lg:text-[20px] text-center lg:text-left">
          {description}
        </Typography>
        <Divider
          sx={{
            width: '150px',
            borderColor: '#fff',
          }}
        />
        <div className="flex flex-col items-center lg:items-start gap-[15px]">
          <Typography className="leading-[25px] lg:leading-[33px] text-[14px] lg:text-[20px]">
            Ứng dụng đã có trên
          </Typography>
          <div className="flex flex-col lg:flex-row items-center gap-[15px]">
            {!isStorePage && <img src="/images/icon-app.png" className="w-[70px] lg:w-[175px]" alt="Logo" />}
            <div className="flex-col gap-[15px] flex">
              <div className="flex items-center gap-[15px]">
                <a
                  className="h-[65px] lg:h-[80px] w-[225px] lg:w-[277px]"
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/download-appstore.png" className="w-full h-full" />
                </a>
                <img src={appStoreQr} className="w-[65px] lg:w-[80px] h-[65px] lg:h-[80px] rounded-[5px]" />
              </div>
              <div className="flex items-center gap-[15px]">
                <a
                  className="h-[65px] lg:h-[80px] w-[225px] lg:w-[277px]"
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/download-googleplay.png" className="w-full h-full" />
                </a>
                <img src={googlePlayQr} className="w-[65px] lg:w-[80px] h-[65px] lg:h-[80px] rounded-[5px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 pl-[36px] hidden lg:block">
        <div className="flex justify-between relative">
          <img src={phone2} className="w-[36%] object-contain" />
          <img
            src={phone1}
            className="w-[40%] object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img src={phone3} className="w-[36%] object-contain" />
        </div>
      </div>
    </Container>
  );
};

function HomeContainer() {
  const isStorePage = useStoreGlobal((store) => store.isStorePage);

  if (isStorePage) {
    return (
      <UI
        caption="Hãy đưa món ăn của bạn đến với hàng ngàn khách hàng qua Shipper Đây!"
        description="Dịch vụ giao hàng tận nhà sẽ nhanh chóng giúp món ăn hấp dẫn của bạn đến với khách hàng một cách đơn giản, tăng trưởng doanh thu vượt bật với vài bước đơn giản."
        phone1="/images/phones/store-1.png"
        phone2="/images/phones/store-2.png"
        phone3="/images/phones/store-3.png"
        googlePlayQr="/images/qr/store-android.png"
        appStoreQr="/images/qr/store-ios.png"
        googlePlayUrl="/"
        appStoreUrl="/"
        isStorePage
      />
    );
  }
  return (
    <UI
      caption="Thưởng thức món ăn ưa thích, với hương vị ngon lành, ngay tại nơi bạn đang ở"
      description="Dịch vụ giao hàng tận nhà sẽ nhanh chóng mang đến cho bạn những món ngon yêu thích, lấp đầy bụng đói và đem
          lại sự tiện lợi tuyệt vời."
      phone1="/images/phones/customer-1.png"
      phone2="/images/phones/customer-2.png"
      phone3="/images/phones/customer-3.png"
      googlePlayQr="/images/qr/customer-android.png"
      appStoreQr="/images/qr/customer-ios.png"
      googlePlayUrl="/"
      appStoreUrl="/"
    />
  );
}

export default HomeContainer;
