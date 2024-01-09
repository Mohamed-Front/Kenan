<template>
  <va-card class="card w-[100%]  p-[2%] m-auto">
    <div class="w-full"><p class="w-full text-2xl  m-auto py-[1%]">Driver details</p></div>
    <div style="border: 1px solid rgb(217, 214, 214);" class="grid grid-cols-1 gap-2 lg:grid-cols-6 p-[1%] rounded-md">
      <div class="col-span-1">

        <img :src="driver_data.pictures?.personal_pictures[0].original_url" class="w-[200px] rounded-md h-[200px] m-auto">
      </div>
      <div class=" col-span-5">
        <div class="flex">
          <p class="text-xl md:text-2xl font-bold px-4 ">{{ driver_data.name }}</p>
          <div class="card flex justify-content-center">
           <Rating v-model="driver_data.total_rating" :cancel="false" readonly  />

          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 xl:w-[100%] lg:w-full p-[1%]" >
        <div v-if=" driver_data.name"  class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full my-auto  text-[white]  pi pi-check"></i>
          <p class="text-xl  px-1 my-auto">{{ driver_data.name }}</p>
        </div>
        <div v-if="driver_data.phone" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.phone }}</p>
        </div>
        <div v-if="driver_data.email" class="flex col-span-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.email }}</p>
        </div>
        <div  v-if="driver_data.gender" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.gender }}</p>
        </div>
         <div v-if="driver_data.country" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.country }}</p>
        </div>
         <div v-if="driver_data.state" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.state }}</p>
        </div>
        <div v-if="driver_data.nationality " class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.nationality }}</p>
        </div>
         <div v-if="driver_data.languages !=''"  class="flex col-span-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <div class="flex" v-for="lan in driver_data?.languages " :key="lan" >
            <p  class="text-xl md:text-xl px-1 my-auto">{{ lan.language?.lang }}</p>
            <p class="font-bold text-xl">&</p>
          </div>
        </div>
      </div>
      </div>

    </div>
    <div class="w-full"><p class="w-full text-2xl  m-auto py-[1%]">price details</p></div>
    <div style="border: 1px solid rgb(217, 214, 214);" class=" p-[1%] rounded-md">




      <div  v-if="driver_data.priceServices" class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 xl:w-[100%] lg:w-full p-[1%]" >

        <div  v-for="driv in driver_data.priceServices" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
           <p class="text-xl  px-1 my-auto font-bold">{{ driv.state_name }}</p>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driv.price }} $</p>

        </div>

      </div>



    </div>
    <div class="w-full"><p class="w-full text-2xl  m-auto py-[1%]">car details</p></div>
    <div style="border: 1px solid rgb(217, 214, 214);" class="grid grid-cols-1 gap-2 lg:grid-cols-6 p-[1%] rounded-md">
      <div class="col-span-1">
        <div class=" m-auto p-[1%]">
      <swiper
        @slideChange="onSlideChange"
        :navigation="true"

        :modules="modules"
        :scrollbar="{ draggable: true }"
        :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
        :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      }"
      >
         <img class="w-[200px] h-[200px] m-auto rounded-md" v-if="!driver_data.pictures?.car_photos[0].original_url"  :src="driver_data?.car_photo">
        <SwiperSlide v-if="driver_data.pictures?.car_photos[0].original_url"  v-for="image in driver_data.pictures?.car_photos">
          <div class="text-center bg-teal-100 rounded-3xl m-2">
            <!-- Doctor -->
            <div class="bg-white rounded-3xl w-full m-auto">
              <img class="w-[200px] h-[200px] m-auto rounded-md"  :src="image.original_url">
              <!-- <img class="w-[250px] h-[250px] m-auto" :src="image.original_url"> -->
            </div>

          </div>
          <!-- Doctor -->
        </SwiperSlide>
      </swiper>
    </div>
      </div>
      <div class=" col-span-5">
        <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-y-3 xl:w-[100%] lg:w-full p-[1%]" >
        <div  v-if="driver_data.car_type" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full my-auto  text-[white]  pi pi-check"></i>
          <p class="text-xl  px-1 my-auto">{{ driver_data.car_type }}</p>
        </div>
        <div  v-if="driver_data.car_brand_name" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.car_brand_name }}</p>
        </div>
        <div v-if=" driver_data.car_number" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.car_number }}</p>
        </div>
        <div v-if="driver_data.car_manufacturing_date" class="flex ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl md:text-xl px-1 my-auto">{{ driver_data.car_manufacturing_date }}</p>
        </div>

      </div>
      </div>
    </div>
    <div v-if="driver_data.document != null" class="w-full"><p class="w-full text-2xl  m-auto py-[1%]">Ducoment details</p></div>
    <div  v-if="driver_data.document != null" style="border: 1px solid rgb(217, 214, 214);" class="grid grid-cols-1 gap-2 lg:grid-cols-6 p-[1%] rounded-md">
      <div class="col-span-1">
        <div class=" m-auto p-[1%]">
      <swiper
        @slideChange="onSlideChange"
        :navigation="true"

        :modules="modules"
        :scrollbar="{ draggable: true }"
        :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
        :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      }"
      >

        <SwiperSlide v-for="image in driver_data.document">
          <div class="text-center bg-teal-100 rounded-3xl m-2">
            <!-- Doctor -->
            <div class="bg-white rounded-3xl w-full m-auto">

              <img class="w-[200px] h-[200px] m-auto rounded-md" :src="image">
              <!-- <img class="w-[250px] h-[250px] m-auto" :src="image.original_url"> -->
            </div>

          </div>
          <!-- Doctor -->
        </SwiperSlide>
      </swiper>
    </div>
      </div>

    </div>
  </va-card>

</template>


<script setup>

import axios from "axios";
import {ref, watch, onMounted} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

import {Pagination, Navigation, Autoplay} from "swiper/modules";
const value = ref(2.5);
const modules = [Pagination, Navigation, Autoplay];
const driver_data = ref({})
onMounted(() => {
  axios.get(`/api/drivers/web/${route.params.id}`).then((res) => {
    console.log(res.data)
    driver_data.value = res.data.user
    console.log("dwd")
    console.log(driver_data)
  });

})


</script>

<style scoped>

</style>
