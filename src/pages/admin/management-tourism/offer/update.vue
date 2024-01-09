<template>

  <va-card class="card">
    <div class=" flex justify-center">
      <form @submit.prevent="onSubmit" class="flex flex-col  w-3/4 py-9">
        <h2 class="pb-4 text-center va-text-bold">
          Update Offer
          <Dropdown v-model="langSelected" editable :options="lang" optionLabel="name" option-value="value"
                    class="w-36 mx-3 mx-10"/>

        </h2>

        <div class="">
          <label for="password">Title </label>
          <p></p>
          <InputText v-model="offer.Title" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.title">{{error.title[0]}}</div>

        </div>

        <!-- <div class="">
          <label for="password">Offer Number </label>
          <InputNumber v-model="offer.number" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.number">{{error.number[0]}}</div>


        </div> -->


        <div class="">
          <label for="password">Price </label>
          <InputNumber v-model="offer.price" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.price">{{error.price[0]}}</div>

        </div>


        <div>
          <FileUpload id="password" @uploader="handleFileUpload" accept="image/*" required="true" :multiple="false"
                      :custom-upload="true" autofocus :class="{ 'p-invalid': submitted  }">
            <template #empty>

              <img v-if="file!= ''" v-for="u in url " :src="u" class="w-[200px] h-[90px]  mb-3"  >
              <img v-else-if="dataEntred?.media?.length" v-for="data in dataEntred?.media" :src="data.original_url" class="w-[200px] h-[90px]">
            </template>
          </FileUpload>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.images">{{error.images[0]}}</div>


        </div>


        <div class=" flex  mt-4">
          <div class="flex items-center">
            <label class="mx-2"> status </label>
            <InputSwitch v-model="offer.status"/>
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
import {ref, watch ,onMounted} from "vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
const router = useRouter()
const off =ref('')
const toast = useToast()
const value =ref("ar")
const offer = ref({
  number: '',
  Title: '',
  status:true ,
  price: '',
  images:[]


})

const route = useRoute();
const entred = ref(0)
const file = ref('')
const url = ref([])
const error = ref('')
const dataEntred = ref({})

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const lang = ref([

{name:'English',value:"English"},
  {name:'Arabic',value:"Arabic"},
  {name:'Azerbaijan',value:"Azerbaijan"},
  {name:'Georgia',value:"Georgia"},
  {name:'Russia',value:"Russia"},
  {name:'Turkey',value:"Turkey"},
])


const langSelected = ref('English')


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
const onSubmit = () => {

  const body = new FormData();
  for(let i=0; i<files.value.length ;i++){
    body.append('images[]', files.value[i])
  }



  body.append("title",offer.value.Title);
  if(offer.value.status == true){
     offer.value.status=1
    body.append("status",offer.value.status);
  }
  if(offer.value.status == false){
     offer.value.status=0
    body.append("status",offer.value.status);
  }
  body.append("price",offer.value.price);
  body.append("lang",langSelected.value);


  axios.defaults.headers.common['local'] = langSelected.value

  axios.post(`/api/offers/${dataEntred.value.id}/update`, body).then((res) => {
    toast.add({severity: 'success', summary: 'Successful', detail: 'Offer update', life: 3000})

    router.go(-1)
    console.log("asd")
    error.value=[]

    entred.value = 1
    let media= dataEntred.value.media
    dataEntred.value = res.data.offer
    dataEntred.value.media = media


  }).catch((el)=>{
    error.value = el.response.data.errors

    console.log(error.value)

  })

}




onMounted(() => {

  axios.get(`/api/offers/${route.params.id}`).then((res) => {




    if(res.data.offer.status == 1){
      offer.value.status = true
    }
    if(res.data.offer.status == 0){
      offer.value.status = false
    }
    console.log(res.data.offer.number)
    offer.value.price = res.data.offer.price
    langSelected.value = res.data.offer.lang
    offer.value.Title=res.data.offer.title

    dataEntred.value = res.data.offer







  })
})


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

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

</style>
