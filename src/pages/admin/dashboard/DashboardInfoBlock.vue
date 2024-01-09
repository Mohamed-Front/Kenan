<template>
  <div class="pt-6 grid grid-cols-12 gap-6">
    <div class="col-span-12  flex flex-wrap">
      <div class="w-full pb-6 grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-6">
        <va-card v-for="(info, idx) in infoTiles" :key="idx" class=" mb-8" :color="info.color">
          <va-card-content>
            <h2 class="va-h2 m-0 text-white">{{ info.value }}</h2>
            <p class="text-white">{{  info.text}}</p>
          </va-card-content>
        </va-card>
      </div>


    </div>

  </div>
  <div class="col-span-1">
        <div class=" m-auto p-[1%]">
      <swiper
        @slideChange="onSlideChange"
        :navigation="true"

        :modules="modules"
        :scrollbar="{ draggable: true }"
        :autoplay="{
        delay: 500,
        disableOnInteraction: false,
      }"
        :breakpoints="{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }"
      >
         
        <SwiperSlide v-for="x in 5">
          
           <img style="width: 90% !important; height: 50% !important; border-radius: 10%;" src="../../pexels-pixabay-163168.jpg"  >

          
          <!-- Doctor -->
        </SwiperSlide>
      </swiper>
    </div>
      </div>
  <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[500px]" />
    </div>
</template>

<script setup lang="ts">
import  Chart  from 'primevue/chart';
 const chartData = ref();
 const chartOptions = ref();
 import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

import {Pagination, Navigation, Autoplay} from "swiper/modules";
  import { ref,onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VaCarousel, VaModal, VaCard, VaCardContent, VaCardTitle, VaButton, VaImage, useColors } from 'vuestic-ui'

  const { t } = useI18n()
  const { colors } = useColors()
  import axios from "axios";
   const userdata =ref([])
  const infoTiles = ref([
    {
      color: 'success',
      value: '15',
      text: 'users',
      icon: '',
    },
    {
      color: '#098071',
      value: '42',
      text: 'Tour',
      icon: '',
    },
    {
      color: '#FFACA6',
      value: '80',
      text: 'reviews ',
      icon: '',
    },
    {
      color: '#AF9744',
      value: '18',
      text: 'Active tour',
      icon: '',
    },
    {
      color: '#E42222',
      value: '12',
      text: 'Reject Tour',
      icon: '',
    },
   
    
  ])
  const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {

        labels: ['users', 'Tour', 'reviews','Active tour'],
        datasets: [
            {
                label: 'New users  ',
                data: [15,63,12,82],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color:  ['#3D9209'],
                    size: 16
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

  onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();

  // productService.getProducts().then((data) => (products.value = data));



  const modal = ref(false)
  const currentImageIndex = ref(0)
  const images = ref([
    'https://i.imgur.com/qSykGko.jpg',
    'https://i.imgur.com/jYwT08D.png',
    'https://i.imgur.com/9930myH.jpg',
    'https://i.imgur.com/2JxhWD6.jpg',
    'https://i.imgur.com/MpiOWbM.jpg',
  ])






})
</script>

<style lang="scss" scoped>
  .row-separated {
    .flex + .flex {
      border-left: 1px solid var(--va-background-primary);
    }
  }

  .rich-theme-card-text {
    line-height: 1.5;
  }

  .gallery-carousel {
    width: 80vw;
    max-width: 100%;

    @media all and (max-width: 576px) {
      width: 100%;
    }
  }
</style>
