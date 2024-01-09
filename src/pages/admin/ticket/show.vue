<template>
  <va-card class="card w-[100%]  p-[2%] m-auto">
    <div class="w-full"><p class="w-full text-2xl  m-auto py-[1%]">Ticket details</p></div>
    <div  style="border: 1px solid rgb(217, 214, 214); height: 450px !important; overflow-y: scroll !important;" class=" p-[1%] px-[2%] rounded-md">

      <div class="w-full">


        <div class="flex py-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full my-auto  text-[white]  pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">Ticket Id :</p>
          <p class="text-xl  px-1 my-auto"> {{ ticket_data?.id }}</p>
        </div>
        <div class="flex py-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">status :</p>
          <p class="text-xl md:text-xl px-1 my-auto text-[green]" v-if="ticket_data?.status == 1">Active </p>
          <p class="text-xl md:text-xl px-1 my-auto text-[#8d8d30]" v-if="ticket_data?.status == -1">PENDING  </p>
          <p class="text-xl md:text-xl px-1 my-auto text-[red]" v-if="ticket_data?.status == 0">INACTIVE  </p>
        </div>
        <div class="flex py-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">Contact Type :</p>
          <p class="text-xl md:text-xl px-1 my-auto">{{ ticket_data?.type }}</p>
        </div>
        <div class="flex py-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">priority :</p>
          <p class="text-xl md:text-xl px-1 my-auto">{{ ticket_data?.priority }}</p>
        </div>
        <div class="flex py-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">Subject :</p>
          <p class="text-xl md:text-xl px-1 my-auto">{{ ticket_data?.title }}</p>
        </div>
        <div class="flex py-2 ">
          <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">Name :</p>
          <p class="text-xl md:text-xl px-1 my-auto">{{ ticket_data?.user?.name }}</p>
        </div>
        <div v-for="t in ticket_data.conversation" class=" py-2 ">
          <div v-if="t.type == 'Message'" class="flex py-2 ">
            <i class="bg-[#DE4915] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">message :</p>

          <p class="text-xl md:text-xl px-1 my-auto">{{ t.content }}</p>
          </div>
          <div  v-if="t.type == 'Reply'" class="flex py-2 ">
            <i class="bg-[#44b95e] p-1 rounded-full text-[white] my-auto pi pi-check"></i>
          <p class="text-xl font-bold my-auto pl-2">Replay :</p>

          <p class="text-xl md:text-xl px-1 my-auto">{{ t.content }}</p>
          </div>
        </div>

      </div>

    </div>
  </va-card>
  <va-card class="card w-[100%]   p-[2%] m-auto">

    <div style="border: 1px solid rgb(217, 214, 214);" class=" p-[1%]  rounded-md">

      <div class="card w-full">
        <Textarea v-model="massage.replay" class="bord w-full" rows="5" cols="30" placeholder="Enter your replay" />
      </div>
      <p class="py-2 text-[red]" v-if="error" v-for="err in error">{{ err[0] }}</p>
      <div class="card w-full py-4 text-center">
        <Button @click="replay" class="w-32" label="Send" />
    </div>

    </div>
  </va-card>
  <Toast/>
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
const ticket_data = ref({})
const last_id= ref(Number)
const error =ref({})
import {useToast} from 'primevue/usetoast'
const toast = useToast()
const massage =ref({
  replay:''
})
onMounted(() => {

  axios.get(`/api/tickets/show/${route.params.id}` ).then((res) => {
    console.log(res.data)
    ticket_data.value = res.data.ticket
    last_id.value=res.data.tickets[0].message.length
    console.log(localStorage.authUser[0]?.id)


  });

})
const replay =()=>{
  axios.post(`/api/tickets/addReplay/${route.params.id}` ,massage.value).then((res) => {
    error.value=''
    toast.add({severity: 'success', summary: 'Successful', detail: 'Replay send Successful', life: 3000})
    location.reload();

  }).catch((el)=>{
      error.value = el.response.data.errors

      console.log(error.value)

    })



  };


</script>

<style scoped>

</style>
