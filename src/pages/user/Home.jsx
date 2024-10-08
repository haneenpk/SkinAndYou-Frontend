import React, { useState, useEffect } from 'react';
import { toast } from 'sonner'
import axios from "axios";
import "@fontsource/great-vibes";
import { appoinmentSchema } from "../../validations/appoinmentSchema";
import handleInputChange from "../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../utils/formUtils/handleFormErrors";
import FormErrorDisplay from "../../components/FormErrorDisplay";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { HiMiniXMark } from "react-icons/hi2";

function Home() {

  const testimonials = [
    {
      text: "I wanted fillers for a more youthful look, and Dr. Geeta's work was perfect. The results are natural, and I feel more confident. Great experience at Skin & You Clinic!",
      name: "Sonal P",
      age: 38,
    },
    {
      text: "I was struggling with hair thinning, but after starting treatment with Dr. Geeta, my hair looks fuller and healthier. I'm so happy with the results!",
      name: "Ravi M",
      age: 42,
    },
    {
      text: "I was nervous about Botox, but Dr. Geeta explained everything and made me comfortable. My forehead lines have softened, and I look refreshed. Highly recommend!",
      name: "Priya K",
      age: 34,
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [showButton, setShowButton] = useState(false);

  const [appoinmentData, setAppoinmentData] = useState({
    username: '',
    email: '',
    phone: '',
    bookingDate: null,
    message: '',
  });

  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

  const handleOpen = () => setOpen(!open);

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleChange = (e) => {
    handleInputChange(e, appoinmentData, setAppoinmentData, setServerResponse, setErrors);
  };

  const handleAppoinment = async () => {
    try {
      await appoinmentSchema.validate(appoinmentData, { abortEarly: false });
      setErrors({});

      const response = await axios.post(`https://cozastore.online/api/user/appoinment`, appoinmentData);

      if (response.data.message === 'Success') {
        setAppoinmentData({
          username: '',
          email: '',
          phone: '',
          bookingDate: null,
          message: '',
        })
        handleOpen()
        toast.success('Appoinment Booked Successfully')
      }

    } catch (error) {
      handleFormErrors(error, setErrors, setServerResponse);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const aboutUsSection = document.getElementById('about-us-section');
      const bannerSection = document.getElementById('banner-section');

      if (aboutUsSection) {
        const aboutUsTop = aboutUsSection.getBoundingClientRect().top;
        const bannerBottom = bannerSection.getBoundingClientRect().bottom;

        // Show button when About Us section is in view
        if (aboutUsTop <= window.innerHeight && bannerBottom < 0) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBookNow = () => {
    // Handle book now logic
    alert('Book Now Clicked');
  };

  return (
    <div className='-mt-36'>

      {/* Banner */}
      <div id="banner-section" className='relative w-full h-screen'>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="http://www.skinandyou.in/static/media/Website%20Video.609f78c6161b60ddc4be.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Optional content over the video */}
        <div className="relative z-10 h-full">
          <div className='top-64 absolute left-10'>
            <div className='text-4xl font-semibold text-[#fe9b8e]'><span>Look Better<br />Feel Better</span></div>
            <div className='text-xl mt-3'><span>Instantly Smooth Away Wrinkles and Scars for a Fresh, <br />Youthful Glow</span></div>
            <div className='gap-y-3 mt-12'>
              <button className='shadow-lg py-5 px-12 bg-white text-xl text-[#0c1451] font-semibold rounded-xl transition duration-300 ease-in-out hover:bg-[#fe9b8e] hover:text-white'>
                Call Now
              </button>
              <button onClick={handleOpen} className='shadow-lg py-5 px-12 bg-white text-xl text-[#0c1451] font-semibold rounded-xl ml-10 transition duration-300 ease-in-out hover:bg-[#fe9b8e] hover:text-white'>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Book Appointment Button */}
      <div
        className={`fixed bottom-5 left-5 transform transition-opacity duration-500 ease-in-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
          }`}
      >
        <button onClick={handleOpen} className='shadow-lg py-3 px-8 bg-[#fe9b8e] text-black text-lg rounded-xl transition duration-300 ease-in-out'>
          Book Appointment
        </button>
      </div>

      {/* About Us */}
      <div id="about-us-section" className='w-full py-10 px-10 lg:px-40 flex flex-col lg:flex-row items-center lg:items-start gap-32'>
        <div className='flex-shrink-0'>
          <img src="http://www.skinandyou.in/static/media/Dr%20geeta%20Transparent.f534e189275822cc2cd1.png"
            alt="Dr. Geeta Mehra Fazalbhoy"
            className='object-cover rounded-xl'
            style={{ height: '480px' }}
          />
        </div>
        <div className='flex flex-col justify-center mt-5'>
          <span className='text-[#fe9b8e] text-3xl font-bold mb-4' style={{ fontFamily: 'Great Vibes, serif' }}>About Us</span>
          <div className='text-[#1d2a4d] text-5xl font-bold mb-4'>
            <span>DR. GEETA MEHRA<br />FAZALBHOY</span>
          </div>
          <div className='text-[#848e9f] mb-6 mt-5'>
            <span>Dr. Geeta Mehra Fazalbhoy, MD & Founder of Skin & You Clinic, Mumbai, is a globally recognized expert in dermatology and aesthetic medicine. With advanced international training and certifications, she specializes in cutting-edge, pain-free treatments for skin tightening, pigmentation, and body contouring. Her clinic is ranked among the top in India, attracting patients worldwide.</span>
          </div>
          <div className='flex gap-2'>
            <button className='py-4 px-7 bg-[#fe9b8e] text-black rounded-lg transition duration-300 ease-in-out hover:bg-[#fe9b8e] hover:text-white'>
              KNOW MORE
            </button>
            <button className='py-4 px-7 bg-[#fe9b8e] text-black rounded-lg transition duration-300 ease-in-out hover:bg-[#fe9b8e] hover:text-white'>
              INSTAGRAM
            </button>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className='h-96 px-2 flex'>

        <div className='rounded-lg px-7 w-1/5 flex flex-col items-center justify-center' style={{ backgroundColor: 'rgb(246, 251, 239)' }}>
          <div className='bg-white rounded-full h-28 w-28 flex items-center justify-center'>
            <img className='h-20' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABkCAYAAAAR+rcWAAAABGdBTUEAALGPC/xhBQAACklpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAAEiJnVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/stRzjPAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAAHsIAAB7CAW7QdT4AABmrSURBVHic7Z13eFzVmf8/57YpmhlVq7rbWAI3wKYEbAx2MAZnKSYQSChLWGDJsgEWB8Luk7bJkgLkySZhk7BhqYmBEAgtWQIEiCmmBDBgbBwDtiVbbSSNNJp22/n9cSRbtmV5Rm2T/Px9nnksj+4p93vPedt53yshpeQghg+j90sv/1/PIQYsA6YAYUACaSA34Box4N8gYAJa33U7gKeB7nGa7x4w/i8G7cMU4CKgFIgD7wPrgY/zbD8DmAc0AMcCSeApYN2oz3QIiOTql8ZzvH58DZgOvAn8EmgfYX8VwCrgSMABbgW2jrDPvDDeKzAG/AiwgauBxCj1Gwdu7/t5NXAb8Djw01Hqf7/QxnqAATgMuAt4HriM0SNvb9wCXAnMB34CFI/ROMD4EVgPfB+1Iu4ch/G2o0h8s2+8o8ZqoPEgMAjcBHwV+P04jDcQ/416cLcAS8ZigPEg8HqUmfHaOIw1GF5EiYzrgQWj3flYE/hpYCbjIMwPgM0o5fItRpnEsSQwCnwG+I8xHKMQbAS+AXwXmDxanY4lgeehjNoPxnCMQrEO+AHwldHqcKwI1FCa98FR7ncKygz61Aj6eAJoAT47GhMaKwJPRfmmjaPY54UoD+Ye4ExGplVvBU5nFLbyWHkiRwB/GqW+pgD/jvJevo6y8Z5HbcU/AzuH0WcC+DVKPl84kskZEXN/hrrA8zKk/SxiVzAkL+ioB/PCSCaG0t5nozyKN1D2XD8+Av4HRcAlw+z/V8Bi4O9Qbt+wYGzs3bLPlz4SkEwP1hANVGHbneR8GyHy2vErUaIhNYz5lKG25nygHBWquprBgw2/QZkkX0Np1+Hg+yiF8jSQHU4HYtmpy/f50sfHkz7VVikXV53MaZUn4rop0m4a7cAk3oqSfT8oYB4LUTIphNpe7wOPAn4ebe8EfgE8U8B4A/EvQC+7gxEFQZ9xyAwE7PHRhYYpdHbkOng4vhbfdzm+/BiQLp50D7SlVwK/Ra2eA2Ey8G2UUlgH/Ay1GjahAqv54H3UKn2sgDYDsRnlqTyNCoUVBP3Q+gYMoe/x0YWGLjRiepioEeb3nW9QrOksKD8O6abw8PdHYikq6nJ/HmNfDVwMvAtci1I6w9lGnajY4hyGp7gyKKP/GuDhQhvrs2bN2u8vJWAJg7Ae5OnEmxxillJfPAfX7d1fkyOAWmCoc4Ia1EoLATcCf2B4K2cg3kY9hE1A2zDav4OKbC9Dafi8cUCB5iOJ6EFKjSjXfvgT3uz6E0XBaqQcVDxVMvQqqgK+BHwH+GdGHonuRwYVebl8BH3chHr4lxbSKC870JM+pUaEHjfNdxvXsCY6iyIjSsrr3XsrR1E3swvq1E8SjdVCILIG390ElAB/DwTYfUhkIjFQZpBg98OVgNf3sVEPKNP36UIZ7G0I8QxSHpvr3lGfczMfaNqwTNzVwH0oT+XJfBrkPYonfSYHK3m79yP+q+nXXDXtUoxsGlfKgRSGgJ6B7TQBReFKnvngmd9uavvgpFig6CTp+1cqhSUA1V4TAt0w8KXE93wQIKViz0ei6RoIDdfzkVIq9SxAaBpoGhnXbjY1Q36mfrkXsoq+7bgDD/XyRg9qZ9yBUigHjF8W9JiklEwKTOCO1t+zqHgOh5cuIJnZCbtNG4sB9p+UPpFIDa1df77u3ueuP7Wxo5uwDpahYRoahq4rMnwfO+fi+RCNhrBME9/3kUikBIQg59h0J23QwDDYRabjQc4BqVPj63BErOSKow8999t218cIUZAD0I9tqNPCn6BIfG6oiwsjEEmRHiTpZbj+45/zq9BEigPl9OQ6+u1DnQHnuYZmgNBLn33vzlumx0w+UbcA1/fQdQO0/vUHIPB8j1w2h2HomJaFBehCkPF9NCGwczk8z8MyTTShIZEgfXzPx3UcfF+Sdjv4sPmlKUdPX7nM0PRnvcHldD7YCVyFkqsVKK9lUBQcTOg3sBuzcb67/RegBQjoAXVDqj8PFNmhcCVbd7x8/cadLxMKVZOWEhtB2rFJZbMksxlSmQypTJqc46BbFq6m43se7b1ptnYmEL4kmbPxdAMRCJKTPmnHJu04ZDwfW9MQoTBGJIJRVMXHbetp6dhwYTBYOizmBqAR+CfgHODf9nfRsKIxnvSZFqrmofhL/Kb5SQLB6v6ONOgXTxroRmjb9ueu0nNJpGGB79OfSiKEQAht1wcJnuehSYnmejznud69Tq6tOZ0mZhj4vo/neUgEUjMQuvpIBK7vY/selh6A3nY2Nb+6SpgRQ47YOuJD4FyUorsLOGTvCw5IoOM4SCkRQtDd3U08HieTyWAKnRqrjJsaH+Cj7vf6TBtP0peGYWlBktnGC7Z3vx+ZoZWhuS62ANM0sQJBLCuIZQUwA+pjBYPohkGR0Hgn3kloet3qK6+88JAtvkR3XQBMw8CyAliWiWmaGIaBZZoYpomjaZQ7HuV6mE3tb0XdTPx8U7NGSmA/voKK3vwIdXh/YAJ9X8mPCRMmzBVCfD2RSKybNGnS5jlz5vyPZVmn//nDLUa6tZvebIovf/xzXLeXqFXq+9I3NARWoJim+HtLtya3E7OiTHMFbiZLYzxOS1sb8c4OuhLddCW66ejsoqW1lUQigeZ7pIRgwaEzXv7E9Ik9elFoZ2/OxvN94h2dtLS20dHRSVciQWdnFzvjHTS2txHu7mWC7WOFy9jRtYWPW9/9VDA4qkfCjwP/irJhd8URB1UiUkp0XScWi93c3t6+WgjBDTfcwLJlywiFQoc0NTVdsnbt2u2vvfbaE++8tf6BX69/+o9XJQx++olvbI+FqgMAWCGSqcRhyWwWJ6xR7sI8LLYIjx12hlw6Da6LkKDrOqFQkEAggCcloVCQQybVxg0NioqjG3o7e2qLQkEsyyTZmyKVSmH7KmYU1XSmBUJMNU1MXUfqGqlMM125HcdghEaTQFDnzDehAiV/D/Ts48pJKdE0jUAg8GAikbisubmZ22+/nUWLFmGaJgCxWIy5c+cWr1ix4qjFJyy+5IiZc85Z1/tBsdPcObFzZ9s7t269t+m46GwmTa+avjm+9qj4jm49K8CXUB0MUxmJEikqIhyLEovFKC0toSQWU3ZgNocdsrb5dZVfm1ZTQnZny5Hdm5uODUdDBIMhYrEo0aIiKiIRpkSiTIsUEw2F6ZA+O3JZGuMdlE8t4eTF5z1udcbedkU2McokbkVZGzcAD+9DoBACwzDucV33/C1btrB69WpOOeWU/fZWWlrK4fPnV3729HOXGfMqlrwTbpx7++ZHQ01bPvaXFn9yU1xuWZ3WOoLF1dV16YAebfdckbZz+K6HYZpolomTs8llHTzPpbm5k4b6up7TltX/oC6YoyidafhgfdOKQNAEJK7ngScJ6Dq+ptEpfDpNjUzI7LKqynbWTq9+smH+vCvqi5ZusxP2TKn7744ygaACIPXAErFy5cpd30opMQxjhZTyd8lkEsMweOyxxwiFCtsKjuvw3IvPpew3u1994o3/vaZ121vvHlZawuIFc7Ay9uxMS0d1ZWWJsXHd28G2eKKoctrkgBGwwqlkJhyrqvIXL515Qm114Ju5jPeGMM3LH37gtcg76zZ0lpWFc5Zp2sXVFdlkIpXVDD1VN7UuqWuit7S2IhEMhLpDVZJgy1RqW47/rBdMR6WUPxtd7vbAPbtkYJ/cE0KIX3ieR0tLC5deemnB5AGYhsnyE5cXcSJLj+495Z0XX3ljy9oXnr/7vu3b1nQ1btsQsnMbFgYsZEkJvT0pZlVXUB0M0FOcY/7y+ZSX613trV2lCI2oZXacdvbC2zvb29m6sZFpM2qJVcRwciouGSstxnNsgqEwKTuOEa9kas8ChOknpfRLKew4olDcvMcWNk3zat/3z/I8D9u2ue6666iqqhrRCEVWgENnTCtbsfSkpUuXnfzFukMazuzUrAnPbfqo5w9bG1sarQCNwuT19hQL51Yxu6GYjvaeyZqmvyeE6M5l7ZpYLCQOnTela8e2OG3NCcpry8n0qJhFtCSG7/rIsA0IDk2eQdApI6f3TBZolYxtSkmbPmvWrP6ti6Zpv3Icp7inp4fp06fzhS98Ybj+5KAIBixmTp1SvfzEJUs/c+YZ/zixqurIrONmNzY2bX9688eOWRrl9COmgO3Ztuc3CyE8IUQsncq5sZJI5+zDp7FjWyuu1PBsFyEEpRVlOGSwYhrTe5YzwasnrXUg0KahwmuvjtoNDIJdK1DX9WN93/8X3/dpbW1lxYoVLFq0aMwGtiyLuXPn1p/xd586b8nxx/3DnKkTpz/58rvv2T3J7kWzaxJFQniuD67vt+ua1pNJZ/2S8ijhSIBtWztwcy66rhMuC5DMtXNs7CIqe+eQ1jv6Q2yzUIdUY5rUZIDSvL7vX+P7fp+LJZg3b95YjrsHGhoaqhoaGq5M2557w39894uzJ5azcFIZ6A6G7vueq/kikCEnfGzRTcrvAN/AcyUyVM4CzqeidzZpsxMVnhAARYA71nPfpUR8318M4LouxcXFTJ06dazH3geTqivqTDfDN377HmYkyGkTp3L1SZPo0RLQMRWnpZSaroUsmdTCC+/fS9rp4ajAeVSZC0jlmvGFNzDAu09wdyzQvwLLpZQTQPm+xcXFVFRUjPXY+2DV2Z9elclk7/rP2356ZTzXmXnNrkIvP4mwnsJNlOO7GlHLYl7FsZQeVoftpai0Z5PydyLFPgddEfI7GRwRjH4FIoQwc7kcrutSVFRELBbbdVHL44/Tsm4dMy68kGhDw5hNRtd1Lrr44ovNSLDmghsuO61+ygkeuXJwwkgzhbAkNpBLtTOxpAEhDJLZtj5Ft4+yKwGeHbPJ9sFo7k0ioCMSCt8T1fWLTNOks7OTbDaLZVn4ts2rq1ax2XV596abqJg0ibpzzqHmjDOYcPzxoOujOqEEGRo7m3dcW7vKu3HKJWRlQndNxxt4jRA6KTvR9/Og8ZC5KId/06hObhDoFy87mfoJlQSF+E2v5y2wLKt+586dJJNJlixZgtB1rNZWDps/n9qZMzFdl/Rbb9Hz6qukN24kWleHXlk54ok0tu9MNv7uHdN+5OM367dEnzv/kDNLDd04zvezJ5uaOQtB1pcynmd3n0WJp+FmK+QN4zunroRYMb0tO8Ofe+yR1mwmS11dHQ8//DBCCFadfTaTbruNXinJpFKUSB/fdbETCXqamtxNvUmjKpGgqqRk0AEc1OYa6uwgBbT8/I2nyp/pvTlaW/ZeoKw43J7bOT9tZzZ6Ur5g6ebcqBk6IWwE61zfe9aV3t7ybm9EUekeYw4h1zwIseILnlz/1pU3Pf/scVFNxxeC5u5umpqa/NLSUrt6wgTb0jVZEgx5ZdGoW1dZlTuspmZHcSSa8qSfePOjD194o6kpUBmLmaWRiGmYpmEETCMYCARPrTx6eSRc6rycXP/aFqdF1BdPNgJmQBOa0NMyJycFK2un5coWtT624W6hibd6Ra5UQAhECrAkMgS0m5oeLgsUnzc5Ut1haeZKT3r7S15ajgrDXzYeBBoEQ6ufevftsz//m18fVuT79ASC2epodMdn5h+erl28JBgzjECxaRo10ZhZFg7rEdM0Q4ZhmaZ1KGCCTJ40Z/6dd3X3PPmt55+juiiCITS2Zlv4VOkxzK4/+Vjfs+85LBW44qnGddwSv5W6QAUxvYhtuVa+N/0yTqg94xanqGRtWsu9FPACphBCSnCQOEIIV4AwNP3oiBk+ViLX+tK3h7in21HlY+MCw3edryXSmacumj338EPLyzvKIxF3TmW1M2PipAp0rRyJhe+D54LrgecifR+nL6CJlOFIUdHRV5173pNaUYT//tPrVMdi5LKCT0/7JMGaqnW96cbMMXVHvXB/w3FL7m56hB/veIQup5davY76KTMxK0t/PMOWZzu+m/Gl/AhBEjCQFAlBRCDKDU2vF2i3ZNzMC5709pcldh3wEuNYcCiy9/5SBgIBCIW8XSc9to2bSuWVWwY8IaX8dKC4JBdvb+PcB36Jj4/UfH488yrmRhvodbpKfel3hvXQDUag/Hsbut/l4fY/8lD7H/nqlAs4u+ZUerNt5UKIkwVCgtQAifrZk2BKKd8UiA+8Pvk3iI9+DXA86hDoX4HvMYxsq0JhCCFwbBtsWy/gDCuJykD9JbBGCAGOje25hC2DjmyaYjNEWA/Q5011aUKblvGzd4vMjp2zI7Pumx2bzTkVi9GEIKdMkg4p5f17nqTlPaMTUKm6K/sahVGH43fkf0vDgwF5T9MH/hN12NyKSivbDaGOFz1fogmBL31c6THAwN0qECcD9yfteKWG+H5DZAb4Nj1uL5o4sD0pkYNtXQv4JorAlr7vHkRlro45gYWcC2uoLaKzN3kAmobjOnRlMhiaji0dHOmyl4dgAxcKxLESvtzrdNPrZfIibz8oR6W23Y9KtOzHelSK3T8Nt+N8UejB+tGo84B9ygP8XI6q8gnMq6rhg65mJJKoEUFKb+9LUyg5dQYqoXG47B2DOiFrQp3Z7o0fAZ9gDCs1Yfh1IubeXzg5m0ggyA/POZVF06ZwZflZTAnVkd5/MubPgA2ovJNCA4+XoPIMf9j3KRvkmhyqNu4bwOwC+88bwyFwDSrlYTekQJgSR8YJ2iWsabiR8yacSNrp6cv43wcRVLLlV4Cfo8oV8jF8i1GEnQX8I+oBzBviPjahznB/xiBpGaOBQgiMo0rpP7fHt1IgQjZCk7gfVZN8pRK9J0bWTOHt3+WqHjD2b1H1IAtRN7p0kOsjKHl2Gyrp5/S++YBKuBzKGf89arXeDJx4oJssFIWkt92NyuDcDSkQYRvZE8L+oBrZHUIEHdJGEnwxlL+6BJWd2o84cAVwPsoNOxGlFDIoeTsTRdTXgb0LW3pR1UxD4RWUbfh1lCIctQrSQlZgYI//SYGI5JApi9zbk5A9QUQkB7oP8oAHUcehyk/3xhpUqf4fUC+oqEWZJt9BZQLsWxWkyr1q8pj/+6iqgEqUmVOdR5sDopAV+BCgjEZdooVz+MkQ9rt14GmIolw+xIEqSXAYXHP243nyz5Z/BWVAl6JypodCBlVecTnKpn2FwgqC9kG+K/B64AWkQFgeIujiNpVhvzUZmbEQITtf8gC+jCrTGq0DnyzK//1WAW1uR93TZFTN3bnDHfxABPag8uFuBsD0kL6Gs6EWZ0Mt0hOFkBdEKYEPgf8d7oT3g0dQW/lO8te221BlXnegZO4dqAr7giBy960ZypPzUdrxLQCtOIOzsQZnczVacUb5+gfGzL4JnoKSYTcWOskCcAHKQH8F5asXUrm0HKXImlFlX4/m0+hABIJkFZp8RCuy8VpjOBtrFXH6oLGaEKrkairKzoui5GwGterey+9eRoQylKk1ASVrk6jqpZ2o1LQmhhYfq1BKzkIpuscY4nRvaAKluF+Y3vlYLt6OUpw/V6naDMsZuG3n930qUdvUQW39nSjShlWwMUqoRz3QCahTuv7wkIt6qL0ocrehREt6QNsFqMr7MtT9vIG6nz3IH4zAHuAJpHhEBJ2HEOBursJtKgPLRZguSBFBabLJfdc3o6oe17PbwAUlP+OoKvPxRBmDBTwUqoGJff+Wo7wbC+WTh1Bm06Ooe6Lvd2eh3MEAakG8jqpk8kXuvjVtKJdoPfA6kqcw/LgIOchUAGdTDX48opSFLuuRrOqbgI3yIp7ez0QvQ2m77SjBPlQYfrQwHVWF/iJ7u5sHRllf2yNRvr6N8mIGFk5OQZXm1vVds0Xk7lsTBtJIwPARARdsAy8exd1WjkxZiLA9A/g8aptuAh5AyZKh8M8ovxWUhjwbFckZCxgoS6EC+C+UEhkJAihZuBhF5FfZq4QNpRyvELl714AmEUEHHAOvNYbXUozfHQLTCwjL/TekmIySAT+hr5AmTxyCInFF3/9vQkVHRms1aijD+FKUxr2OPUXIaOBaVOjsOgZRJsL+1b2gSfy2KG5jOX4iBLqPCLgnopzwt1FV5fuNS+WB61FvDAIlm65CBUGHWwlTjLqhG/vmdTFKW44VzkTZiOfv/QuRu/tB3G3leG1REBIRcAMoq74KJcNeHKVJzEbddP9bNlzUdnsU9ZD2J/RByZtDUbbkBagQVg61or/JyAu288EXgWmoFbkLInntK8icgQg5oMkjkXwJJatuGqOJ1KMM1s+z58sR4yj5ug1lCoXYHYmZMOC6TaiXmf2Q8SFuIO5Avfnokf4vRPKaV8D0QIqzULLk2yjfcjxwPPBJlLBeyOBvm/wIlab7LPA7hveindFCBUoUfZG+sl4DwwcplqHOVS9BTXi88BJ7PqwYMAl1EpXgwJp+vBFHvUztc/S9JqX/JWFXoYTkeJI3GHpQNul7/OWR14+7UPLcAEXgFajYWMv+2xzEALShXpZxOSgCeynwVR8Hwf2oV6ToGuPvp/4tYAtK1KzUGPolOQexfzwNLNTYMyXiIPLHWvq28EEMH/GDBI4Mrx8kcGR48SCBI8RBAkeIgwSOEAcJHCEOEqgiP3XDbXyQQBWUncXeeY954iCBCmtR6SfHF9rwIIEKLupPqn250IYHCdyNh1A5PQUlvBdK4Ji+xeYvAH+iwL81UgiBRaiTsr9l/AA4nL3TmYdAIQROJb932/81423Ukeo5+TbIl8CJKAKH9RcP/sqwCfiHfC/Ol8BjUGei/z/gaQqobMqXwIXsm530t4pXUcZ1XnIwHwI1lKX+xggm9deErajssbxeW5cPgZejVuBo/oGpv2T0osRVXm+wzYfANHv+PaO/daRRhYx5Hff+PxdsevyQNgLqAAAAAElFTkSuQmCC" alt="" />
          </div>
          <div className='mt-8 text-center'>
            <span className='text-2xl font-semibold text-[#1d2a4d]'>Body & face laser hair removal</span>
          </div>
          <div className='mt-4 text-center'>
            <span className='text-[#848e9f]'>Experience smooth, hair-free skin with our advanced...</span>
          </div>
          <button
            className='mt-5 px-11 py-4 rounded-full text-[#848e9f] transition-shadow duration-300 ease-in-out hover:shadow-xl'
            style={{ backgroundColor: 'rgb(188, 214, 155)' }}
          >
            Know More
          </button>
        </div>

        <div className='rounded-lg px-7 w-1/5 flex flex-col items-center justify-center bg-white'>
          <div className='rounded-full h-28 w-28 flex items-center justify-center' style={{ backgroundColor: 'rgb(255, 249, 253)' }}>
            <img className='h-20' src="data:image/png;base64,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" alt="" />
          </div>
          <div className='mt-8 text-center'>
            <span className='text-2xl font-semibold text-[#1d2a4d]'>Tattoo removal</span>
          </div>
          <div className='mt-4 text-center'>
            <span className='text-[#848e9f]'>Safely erase unwanted tattoos with precision laser..</span>
          </div>
          <button className='mt-5 px-11 py-4 rounded-full text-[#848e9f] transition-shadow duration-300 ease-in-out hover:shadow-xl' style={{ backgroundColor: 'rgb(228, 174, 209)' }}>
            Know More
          </button>
        </div>

        <div className='rounded-lg px-7 w-1/5 flex flex-col items-center justify-center' style={{ backgroundColor: 'rgb(252, 248, 236)' }}>
          <div className='bg-white rounded-full h-28 w-28 flex items-center justify-center'>
            <img className='h-20' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAACNCAYAAACALpWyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MkMyMzA2RDIxNzExRUE4MjE0OTQ0RThFNTEwMDg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4MkMyMzA3RDIxNzExRUE4MjE0OTQ0RThFNTEwMDg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjgyQzIzMDREMjE3MTFFQTgyMTQ5NDRFOEU1MTAwODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjgyQzIzMDVEMjE3MTFFQTgyMTQ5NDRFOEU1MTAwODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qvBrGAAAWHElEQVR42uxd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" alt="" />
          </div>
          <div className='mt-8 text-center'>
            <span className='text-2xl font-semibold text-[#1d2a4d]'>Fat Loss & Inch loss</span>
          </div>
          <div className='mt-4 text-center'>
            <span className='text-[#848e9f]'>Achieve your body goals with non-invasive, targeted...</span>
          </div>
          <button className='mt-5 px-11 py-4 rounded-full text-[#848e9f] transition-shadow duration-300 ease-in-out hover:shadow-xl' style={{ backgroundColor: 'rgb(239, 219, 162)' }}>
            Know More
          </button>
        </div>

        <div className='rounded-lg px-7 w-1/5 flex flex-col items-center justify-center bg-white'>
          <div className='rounded-full h-28 w-28 flex items-center justify-center' style={{ backgroundColor: 'rgb(255, 249, 253)' }}>
            <img className='h-20' src="data:image/png;base64,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" alt="" />
          </div>
          <div className='mt-8 text-center'>
            <span className='text-2xl font-semibold text-[#1d2a4d]'>Botox</span>
          </div>
          <div className='mt-4 text-center'>
            <span className='text-[#848e9f]'>Effortlessly smooth wrinkles and rejuvenate your skin...</span>
          </div>
          <button className='mt-5 px-11 py-4 rounded-full text-[#848e9f] transition-shadow duration-300 ease-in-out hover:shadow-xl' style={{ backgroundColor: 'rgb(247, 177, 176)' }}>
            Know More
          </button>
        </div>

        <div className='rounded-lg px-7 w-1/5 flex flex-col items-center justify-center' style={{ backgroundColor: 'rgb(242, 252, 252)' }}>
          <div className='bg-white rounded-full h-28 w-28 flex items-center justify-center'>
            <img className='h-20' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAACUCAYAAACHrJc0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCRERDNjMwRDIxQzExRUE5MzA3ODdFRTNEMEZBOUJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCRERDNjMxRDIxQzExRUE5MzA3ODdFRTNEMEZBOUJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUJEREM2MkVEMjFDMTFFQTkzMDc4N0VFM0QwRkE5QkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUJEREM2MkZEMjFDMTFFQTkzMDc4N0VFM0QwRkE5QkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ig5rPAAAUsUlEQVR42uxd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" alt="" />
          </div>
          <div className='mt-8 text-center'>
            <span className='text-2xl font-semibold text-[#1d2a4d]'>Body and Face Tightening</span>
          </div>
          <div className='mt-4 text-center'>
            <span className='text-[#848e9f]'>Lift and tighten sagging skin with our cutting-edge, non...</span>
          </div>
          <button className='mt-5 px-11 py-4 rounded-full text-[#848e9f] transition-shadow duration-300 ease-in-out hover:shadow-xl' style={{ backgroundColor: 'rgb(168, 217, 216)' }}>
            Know More
          </button>
        </div>

      </div>

      {/* Latest Instagram Post */}
      <div className=''>
        <div className='w-full text-center pt-10'>
          <div>
            <span className='text-[#fe9b8e] text-3xl font-bold' style={{ fontFamily: 'Great Vibes, serif' }}>Latest</span>
          </div>
          <div className='mt-3'>
            <span className='text-[#1d2a4d] text-5xl font-semibold'>Instagram Post</span>
          </div>
        </div>
        <div className='flex gap-x-10 px-28 text-[#1d2a4d] text-2xl font-semibold mt-12'>
          <div className='w-1/3'>
            <video
              src="https://www.skinandyou.in/static/media/MNRF.a9b57e63ce74a0dfaff9.mp4"
              className='w-full h-56 rounded-lg'
              controls
              autoPlay
              loop
              muted // Optional: to prevent autoplay issues in some browsers
            />
            <div className='p-2'>
              <a
                href="https://www.instagram.com/p/DA0ktWTSnAZ/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ever wished for a skincare saviour to save your skin from all its troubles?
              </a>
            </div>
          </div>
          <div className='w-1/3'>
            <video
              src="https://www.skinandyou.in/static/media/Deep%20Peel.b590f6b77350b61771ce.mp4"
              className='w-full h-56 rounded-lg'
              controls
              autoPlay
              loop
              muted // Optional: to prevent autoplay issues in some browsers
            />
            <div className='p-2'>
              <a
                href="https://www.instagram.com/p/DAiSuQpSX7k/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dr. Geeta's guide to get rid of dark circles and wrinkles
              </a>
            </div>
          </div>
          <div className='w-1/3'>
            <video
              src="https://www.skinandyou.in/static/media/Dermal%20Fillers.187905b74f814b4fd57d.mp4"
              className='w-full h-56 rounded-lg'
              controls
              autoPlay
              loop
              muted // Optional: to prevent autoplay issues in some browsers
            />
            <div className='p-2'>
              <a
                href="https://www.instagram.com/p/C_-FO1AIeWp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Time to spill the beans on tear trough fillers
              </a>
            </div>
          </div>
        </div>
        <div className='justify-center flex w-full py-10'>
          <button className='py-4 px-11 rounded-lg bg-[#fe9b8e] transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-[#ffa69a]'>
            LOAD MORE
          </button>
        </div>
      </div>

      {/* Latest News From the Blog */}
      <div className=''>
        <div className='w-full text-center pt-10'>
          <div>
            <span className='text-[#fe9b8e] text-3xl font-bold' style={{ fontFamily: 'Great Vibes, serif' }}>Latest</span>
          </div>
          <div className='mt-3'>
            <span className='text-[#1d2a4d] text-5xl font-semibold'>News From the <br /> Blog</span>
          </div>
        </div>
        <div className='flex gap-x-10 px-28 text-[#1d2a4d] text-2xl font-semibold mt-12'>
          <div className='w-1/3'>
            <img
              src="https://www.skinandyou.in/static/media/thread-lift.448975f3681580c194c5.jpg"
              className='w-full h-48 rounded-lg'
            />
            <div className='p-2'>
              Thread Lift
            </div>
            <div className='text-base text-[#848e9f] font-normal'>
              Get Healthier, Firmer & Tighter Skin in few Minutes Indications Lines and Wrinkles Folds benefits He...
            </div>
          </div>
          <div className='w-1/3'>
            <img
              src="https://www.skinandyou.in/static/media/beauty-possibilities.645fee054da474f35abd.jpg"
              className='w-full h-48 rounded-lg'
            />
            <div className='p-2'>
              Beauty Possibilities
            </div>
            <div className='text-base text-[#848e9f] font-normal'>
              We have a solution to your each concern Concerns Solution Hair concerns:Hair fall, Hair thinning, pa...
            </div>
          </div>
          <div className='w-1/3'>
            <img
              src="https://www.skinandyou.in/static/media/lipocontrast-blog.bc8ccfd14a9aab2e0137.jpg"
              className='w-full h-48 rounded-lg'
            />
            <div className='p-2'>
              Now “LIPOCONTRAST” at skin & you clinic
            </div>
            <div className='text-base text-[#848e9f] font-normal'>
              LipoContrast is a new technology that results in localized fat reduction within a Selective and non-...
            </div>

          </div>
        </div>
        <div className='justify-center flex w-full py-10'>
          <button className='py-4 px-11 rounded-lg bg-[#fe9b8e] transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-[#ffa69a]'>
            LOAD MORE
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-100 py-5 h-80 flex flex-col items-center">
        <span className="text-[#fe9b8e] text-3xl font-bold" style={{ fontFamily: 'Great Vibes, serif' }}>
          Testimonial
        </span>
        <div className="mt-10 text-center text-[#848e9f] max-w-2xl">
          <p className='h-24 text-2xl'>{testimonials[currentTestimonial].text}</p>
          <p className="mt-5 font-semibold text-[#1d2a4d] text-3xl">
            {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].age}
          </p>
        </div>

        <div className="flex mt-4 gap-2">
          <button
            onClick={handlePrev}
            className="h-10 w-10 flex justify-center items-center rounded-full bg-[#fe9b8e] transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-[#ffb5ac]">
            <IoIosArrowDropleftCircle size={40} color='#ffd2cc' />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 flex justify-center items-center rounded-full bg-[#fe9b8e] transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-[#ffb5ac]">
            <IoIosArrowDroprightCircle size={40} color='#ffd2cc' />
          </button>
        </div>
      </div>

      <Dialog size="sm" open={open} handler={handleOpen} className="px-4 py-2">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Book Appointment
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <HiMiniXMark className="h-6 w-6 stroke-1" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-2 pb-1">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Name
            </Typography>
            <Input
              onChange={handleChange}
              color="gray"
              size="lg"
              value={appoinmentData.username}
              placeholder="Your Name"
              name="username"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.username && <FormErrorDisplay error={errors.username} />}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Email
            </Typography>
            <Input
              onChange={handleChange}
              color="gray"
              size="lg"
              value={appoinmentData.email}
              placeholder="Your Email"
              name="email"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.email && <FormErrorDisplay error={errors.email} />}
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Phone
              </Typography>
              <Input
                onChange={handleChange}
                color="gray"
                size="lg"
                placeholder="Your Phone"
                value={appoinmentData.phone}
                name="phone"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.phone && <FormErrorDisplay error={errors.phone} />}
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Date
              </Typography>
              <Input
                onChange={handleChange}
                type='date'
                color="gray"
                size="lg"
                value={appoinmentData.bookingDate}
                name="bookingDate"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.bookingDate && <FormErrorDisplay error={errors.bookingDate} />}
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Message
            </Typography>
            <Input
              onChange={handleChange}
              color="gray"
              size="lg"
              placeholder="Your Message"
              value={appoinmentData.message}
              name="message"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.message && <FormErrorDisplay error={errors.message} />}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto bg-[#fe9b8e]" onClick={handleAppoinment}>
            MAKE AN APPOINMENT
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  )
}

export default Home;
