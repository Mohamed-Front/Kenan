<template>

  <va-card class="card">
    <div class=" flex justify-center">
      <form @submit.prevent="onSubmit" class="flex flex-col  w-3/4 py-9">
        <h2 class="pb-4 text-center va-text-bold">
          Update Accommodition
          <Dropdown v-model="langSelected" editable :options="lang" optionLabel="name" option-value="value"
                    class=" w-36 mx-3 mx-10"/>
        </h2>
        <div class="">
          <label for="password">Name </label>
          <InputText required v-model="accommodition.name" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.name">{{ error.name[0] }}</div>

        </div>
        <div class="">
          <label for="password">Room Type </label>
          <InputText required v-model="accommodition.room_type" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.name">{{ error.name[0] }}</div>

        </div>

        <div class="">
          <label for="password">Owner information </label>
          <InputText required v-model="accommodition.owner_info" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.owner_info">{{ error.owner_info[0] }}</div>

        </div>

        <div class="">
          <label for="password">Description </label>
          <Textarea required v-model="accommodition.description"  rows="5" cols="30" class="mt-3 w-full mb-3" />
          <!-- <InputText v-model="accommodition.description" type="text" class="mt-3 h-[100px] w-full mb-3"/> -->
          <div class="mt-1 mb-5 text-red-500" v-if="error?.description">{{ error.description[0] }}</div>

        </div>

        <div class="mb-5">
          <label for="password">Address </label>
          <InputText required v-model="accommodition.address" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.address">{{ error.address[0] }}</div>

        </div>
        <div class="mb-5">
          <label for="password">Rooms </label>
          <InputNumber required v-model="accommodition.rooms" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.address">{{ error.address[0] }}</div>

        </div>
        <div class="">
          <div class="py-2 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <div class="flex items-center">
              <label class="mx-2"> Country </label>
              <Dropdown v-model="country_id" editable :options="countries" optionLabel="country"
                        option-value="country_id"
                        class=" w-full mx-3 "/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.country_id">{{ error.country_id[0] }}</div>

            </div>
            <div class="flex items-center">
              <label class="mx-2">City </label>
              <Dropdown v-model="state_id" editable :options="states" optionLabel="state"
                        option-value="state_id"
                        class=" w-full "/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.state_id">{{ error.state_id[0] }}</div>

            </div>


            <div class="flex items-center">
              <label class="mx-2">Category </label>
              <Dropdown v-model="category_accommodations_id"  editable :options="catogary" optionLabel="name"
                        option-value="id"
                        class=" w-full  "/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.state_id">{{ error.state_id[0] }}</div>

            </div>
          </div>
        </div>


        <div  >

          <FileUpload id="password" @uploader="handleFileUpload" accept="image/*" required="true" multiple="true"
                      :custom-upload="true" autofocus :class="{ 'p-invalid': submitted  }">
            <template #empty>
              <img v-if="file!= ''" v-for="u in url " :src="u" class="w-[200px] h-[90px]  mb-3"  >
              <!-- <img v-else-if="dataEntred?.media?.length" v-for="data in dataEntred?.media" :src="data.original_url" class="w-[200px] h-[90px]"> -->

            </template>
          </FileUpload>





                      <swiper
        @slideChange="onSlideChange"

        :navigation="true"
        :options="swiperOptions"
        :modules="modules"
        :scrollbar="{ draggable: true }"
        :autoplay="{
        delay: 2000,
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

        <SwiperSlide v-for=" img in elements"  >
          <div class="text-center  bg-teal-100 rounded-3xl m-2">
            <!-- Doctor -->
            <div class="bg-white rounded-3xl w-full m-auto">
            <img class="relative rounded-md" style="  height: 150px !important;"  :src="img?.original_url">

            <button class="absolute top-[7%] left-[5%]  bg-[#861d1d]  p-2 px-4 rounded-full "  @click="showdata(img.id)" :value="img.id"><svg  width="20px" height="20px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#ffffff"></path></g></svg></button>
              <!-- <img class="w-[250px] h-[250px] m-auto" :src="image.original_url"> -->
            </div>

          </div>
          <!-- Doctor -->
        </SwiperSlide>
                       </swiper>


          <div class="mt-1 mb-5 text-red-500" v-if="error?.images">{{ error.images[0] }}</div>


        </div>


        <div class=" flex justify-between mt-4">
          <div class="flex items-center">
            <label class="mx-2"> available </label>
            <InputSwitch v-model="aval_status"/>
          </div>
          <div class="flex items-center">
            <label class="mx-2"> show detailed information in mobile </label>
            <InputSwitch v-model="info_status"/>
          </div>
        </div>


        <Button type="submit" label="Submit" class="mt-3"/>
      </form>

    </div>
    <Toast/>
  </va-card>
</template>

<script setup>
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

import {Pagination, Navigation, Autoplay} from "swiper/modules";
const modules = [Pagination, Navigation, Autoplay];
import {ref, watch ,onMounted} from "vue";
import {useRoute} from "vue-router";

const swiperOptions = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
const toast = useToast()

const accommodition = ref({
  name: '',
  owner_info: '',
  description: '',
  address: '',
  city_id: 1,
  room_type:'',
  rooms:'',

})
const aval_status=ref(true)
const info_status=ref(true)

const countries = ref([])
const states = ref([])
const country_id = ref('')
const state_id = ref('')
const catogary =ref([])

const route = useRoute();
const entred = ref(0)
const file = ref('')
const url = ref([])
const error = ref('')
const dataEntred = ref({})
const category_accommodations_id=ref()
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);
const elements = ref(null)
const lang = ref([

{name:'English',value:"gb"},
  {name:'Arabic',value:"sa"},
  {name:'Azerbaijan',value:"az"},
  {name:'Georgia',value:"ge"},
  {name:'Russia',value:"ru"},
  {name:'Turkey',value:"tr"},
])


const langSelected = ref('gb')

const handleFileUpload = (e) => {
  console.log(e.files[0])
  files.value = e.files;
  file.value = e.files;

  for (let  i =0 ;i < files.value.length ; i++)
  {
    // console.log(URL.createObjectURL(files.value[i]))
    url.value.push(URL.createObjectURL(files.value[i])) ;
  }
  console.log(url.value)

};
const showdata = (e)=>{
axios.post(`/api/accommodition/delete_image/${e}`).then((res) => {

countries.value = res.data.countries
console.log(countries.value)
})
setTimeout(() => {
  axios.get(`/api/accommodition/${route.params.id}`).then((res) => {
    console.log("moahmed")
    console.log(res.data.accommmodition)
    elements.value=res.data.accommmodition?.media

    accommodition.value.name = res.data.accommmodition.name[langSelected.value]
    accommodition.value.owner_info = res.data.accommmodition.owner_info[langSelected.value]
    accommodition.value.description = res.data.accommmodition.description[langSelected.value]
    accommodition.value.address = res.data.accommmodition.address[langSelected.value]
    country_id.value = res.data.accommmodition.country_id
    state_id.value = res.data.accommmodition.state_id
    accommodition.value.city_id = res.data.accommmodition.city_id
    accommodition.value.rooms = res.data.accommmodition.rooms
    if(res.data.accommmodition.aval_status==1){

      aval_status.value= true

    }
    else{
      aval_status.value= false
    }
    if(res.data.accommmodition.info_status==1){

      info_status.value= true

    }
    else{
      info_status.value= false
    }

    category_accommodations_id.value=res.data.accommmodition.category_accommodations_id
    dataEntred.value = res.data.accommmodition


    console.log(res.data.accommmodition)




  })
}, 200);
}
const confirmDelete =(id)=>{
  axios.post(`/api/accommodition/delete_image/${id}`).then((res) => {

countries.value = res.data.countries
console.log(countries.value)
})

}
const onSubmit = () => {

  const body = new FormData();
  console.log(files)
  for (let i = 0; i < files.value.length; i++) {
    body.append('images[]', files.value[i])
  }

  // body.append("images", file.value);
  body.append("name", accommodition.value.name);
  body.append("owner_info", accommodition.value.owner_info);
  body.append("description", accommodition.value.description);
  body.append("address", accommodition.value.address);
  body.append("country_id", country_id.value);
  body.append("state_id", state_id.value);
  body.append("city_id", accommodition.value.city_id);
  body.append("room_type", accommodition.value.room_type);
  if(aval_status.value == true ){
      console.log("sac")
      aval_status.value = 1

    body.append("aval_status", aval_status.value);
    aval_status.value = true
  }
  if(info_status.value == true ){
    info_status.value =1
    body.append("info_status", info_status.value );
    info_status.value = true
  }
  if(aval_status.value == false ){
      console.log("sac")
      aval_status.value = 0

    body.append("aval_status", aval_status.value);
  }
  if(info_status.value == false ){
    info_status.value =0
    body.append("info_status", info_status.value );
  }
  body.append("rooms", accommodition.value.rooms);
  body.append("category_accommodations_id", category_accommodations_id.value);

  axios.defaults.headers.common['local'] = langSelected.value

  axios.post(`/api/accommodition/${route.params.id}/update`, body).then((res) => {
    error.value=[]

    entred.value = 1
    let media= dataEntred.value.media
    dataEntred.value = res.data.accommmodition
    dataEntred.value.media = media
    toast.add({severity: 'success', summary: 'Successful', detail: 'accommodition Updated', life: 3000})

  }).catch((el)=>{
    error.value = el.response.data.errors

    console.log(error.value)

  })

}


watch(langSelected, async (newValue, oldQuestion) => {
  console.log(dataEntred.value)

  console.log(dataEntred.value)
  if (entred.value) {
    console.log(dataEntred.value.description)

    accommodition.value.description = dataEntred.value?.description[newValue] == undefined ? '' : dataEntred.value?.description[newValue]
    accommodition.value.name = dataEntred.value?.name[newValue] == undefined ? '' : dataEntred.value?.name[newValue]
    accommodition.value.address = dataEntred.value?.address[newValue] == undefined ? '' : dataEntred.value?.address[newValue]
    accommodition.value.owner_info = dataEntred.value?.owner_info[newValue] == undefined ? '' : dataEntred.value?.owner_info[newValue]
    console.log(accommodition)
  }
})

onMounted(() => {
  axios.get(`/api/countries`).then((res) => {

    countries.value = res.data.countries
    console.log(countries.value)
  })
  axios.get("/api/accommodition_category").then( async(res) => {

catogary.value=res.data.accommmoditions_category

catogary.value=catogary.value.map((item ) => {

     // Example transformation: Make the item name uppercase
     return {


     name:item.name.gb, id:item.id

     };
   });   console.log(catogary.value)


});
  axios.get(`/api/accommodition/${route.params.id}`).then((res) => {
    console.log("moahmed")
    console.log(res.data.accommmodition)
    elements.value=res.data.accommmodition?.media

    accommodition.value.name = res.data.accommmodition.name[langSelected.value]
    accommodition.value.owner_info = res.data.accommmodition.owner_info[langSelected.value]
    accommodition.value.description = res.data.accommmodition.description[langSelected.value]
    accommodition.value.address = res.data.accommmodition.address[langSelected.value]
    accommodition.value.room_type = res.data.accommmodition.room_type[langSelected.value]
    country_id.value = res.data.accommmodition.country_id
    state_id.value = res.data.accommmodition.state_id
    accommodition.value.city_id = res.data.accommmodition.city_id
    accommodition.value.rooms = res.data.accommmodition.rooms
    if(res.data.accommmodition.aval_status==1){

      aval_status.value= true

    }
    else{
      aval_status.value= false
    }
    if(res.data.accommmodition.info_status==1){

      info_status.value= true

    }
    else{
      info_status.value= false
    }

    category_accommodations_id.value=res.data.accommmodition.category_accommodations_id
    dataEntred.value = res.data.accommmodition


    console.log(res.data.accommmodition)




  })
})


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};
watch(country_id, async (newValue, oldQuestion) => {
  console.log("hello ")
  axios.get(`/api/state/${newValue}`).then((res) => {

    states.value = res.data.states
    console.log(states.value )
  })

})

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
  console.log(files.value)
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({severity: "info", summary: "Success", detail: "File Uploaded", life: 3000});
};


function imageUrl(file) {
  console.log(file)
  return URL.createObjectURL(file)
}

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

</script>

<style scoped>
.p-datatable .p-component .p-datatable-responsive-scroll {
  display: inline-grid!important;
}
.swiper-wrapper{
 padding: 15% !important;
}

</style>
