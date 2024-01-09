<template>

  <va-card class="card">
    <div class=" flex justify-center">
      <form @submit.prevent="validation" class="flex flex-col  w-3/4 py-9">
        <h2 class="pb-4 text-center va-text-bold">
          Create Accommodition
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
          <!-- <InputText v-model="accommodition.description" type="text" class="mt-3 w-full mb-3"/> -->
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
              <Dropdown required v-model="country_id" editable :options="countries" optionLabel="country"
                        option-value="country_id"
                        class=" w-full mx-3 "/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.country_id">{{ error.country_id[0] }}</div>

            </div>
            <div class="flex items-center">
              <label class="mx-2">City </label>
              <Dropdown required v-model="state_id" editable :options="states" optionLabel="state"
                        option-value="state_id"
                        class=" w-full mx-3 "/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.state_id">{{ error.state_id[0] }}</div>

            </div>


            <div class="flex items-center">
              <label class="mx-2">Category </label>
              <Dropdown v-model="category_accommodations_id"  editable :options="catogary" optionLabel="name"
                        option-value="id"
                        class=" w-full mx-3 "/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.state_id">{{ error.state_id[0] }}</div>

            </div>
          </div>
        </div>


        <div>
          <FileUpload id="password" @uploader="handleFileUpload" accept="image/*" required="true" multiple="true"
                      :custom-upload="true" autofocus>
            <template #empty>

              <img v-if="file.value != ''" v-for="u in url " :src="u" class="w-[200px] h-[90px]  mb-3">

              <img v-else-if="dataEntred?.media?.length" v-for="data in dataEntred?.media" :src="data.original_url"
                   class="w-[200px] h-[90px] mb-3">
            </template>
          </FileUpload>

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


        <Button  type="submit" label="Submit" class="mt-3"/>
      </form>

    </div>
    <Toast/>
  </va-card>
</template>

<script setup>
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {onMounted, ref, watch ,computed} from "vue";




const toast = useToast()


const accommodition = ref({
  name: '',
  owner_info: '',
  description: '',
  address: '',
  rooms:'',
  city_id: 1,

})


const entred = ref(0)
const states = ref([])
const country_id = ref('')
const name =ref("moahmed")
const state_id = ref('')
const file = ref('')
const category_accommodations_id= ref('')
const url = ref([])
const countries = ref([])
const catogary =ref([])
const dataEntred = ref({
  name: '',
  owner_info: '',
  description: '',
  address: '',
  rooms:'',
  city_id: 1,
  room_type:''


})


  const aval_status=ref(true)
  const info_status=ref(true)

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const lang = ref([

{name:'English',value:"gb"},
  {name:'Arabic',value:"sa"},
  {name:'Azerbaijan',value:"az"},
  {name:'Georgia',value:"ge"},
  {name:'Russia',value:"ru"},
  {name:'Turkey',value:"tr"},
])

const valdationText = ref(false)

const langSelected = ref('gb')
const error = ref([])

const handleFileUpload = (e) => {
  console.log(e.files[0])
  files.value = e.files;
  file.value = e.files;

  for (let i = 0; i < files.value.length; i++) {
    // console.log(URL.createObjectURL(files.value[i]))
    url.value.push(URL.createObjectURL(files.value[i]));
  }
  console.log(url.value)

};

var onSubmit = (local) => {
  return new Promise(function (resolve, reject) {
    console.log(accommodition)
    axios.defaults.headers.common['local'] = local
    console.log(files.value[0])
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
    body.append("room_type", accommodition.value.room_type);
    if(aval_status.value == true ){
      console.log("sac")
      aval_status.value = 1

    body.append("aval_status", aval_status.value);
  }
  if(info_status.value == true ){
    info_status.value =1
    body.append("info_status", info_status.value );
  }

    body.append("country_id", country_id.value);
    body.append("state_id", state_id.value);
    body.append("rooms", accommodition.value.rooms);
    body.append("city_id", accommodition.value.city_id);


    body.append("category_accommodations_id", category_accommodations_id.value);

    if (!entred.value) {
      axios.defaults.headers.common['local'] = langSelected.value

      axios.post('/api/accommodition/create', body,accommodition.value).then((res) => {
        error.value = []

        entred.value = 1
        dataEntred.value = res.data.accommmodition
        console.log(dataEntred.value)
        accommodition.value =''
        country_id.value=''
        state_id.value=''
        files.value=''
        category_accommodations_id.value=''
        toast.add({severity: 'success', summary: 'Successful', detail: 'Accommodation Created', life: 3000})

      }).catch((el) => {
        if (valdationText.value) {
          error.value = el.response.data.errors
          valdationText.value = false
        }


        console.log(error.value)

      })


    } else {
      axios.defaults.headers.common['local'] = local

      axios.post(`/api/accommodition/${dataEntred.value.id}/update`, body).then((res) => {
        error.value = []
        entred.value = 1
        dataEntred.value = res.data.accommmodition
        console.log(dataEntred.value)

        toast.add({severity: 'success', summary: 'Successful', detail: 'Accommodation Created', life: 3000})


      }).catch((el) => {
        if (valdationText.value) {
          error.value = el.response.data.errors
          valdationText.value = false
        }

        console.log(error.value)

      })
    }
  })


}
watch(langSelected, async (newValue, oldValue) => {


const body = new FormData();


body.append("name", accommodition.value.name);
    body.append("owner_info", accommodition.value.owner_info);
    body.append("description", accommodition.value.description);
    body.append("address", accommodition.value.address);
    body.append("country_id", country_id.value);
    body.append("state_id", state_id.value);
    body.append("rooms", accommodition.value.rooms);
    body.append("city_id", accommodition.value.city_id);
    body.append("room_type", accommodition.value.room_type);

    if(aval_status.value == true ){
      console.log("sac")
      aval_status.value = 1

    body.append("aval_status", aval_status.value);
  }
  if(info_status.value == true ){
    info_status.value =1
    body.append("info_status", info_status.value );
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
    body.append("category_accommodations_id", category_accommodations_id.value);
if (!entred.value) {
  axios.defaults.headers.common['local'] = oldValue
  console.log(files.value[0])


  axios.post('/api/accommodition/create', body).then((res) => {
    error.value=[]
    entred.value = 1
    dataEntred.value = res.data.flight
    console.log(dataEntred.value)
    toast.add({severity: 'success', summary: 'Successful', detail: 'Flight Created', life: 3000})

  }).then(() => {

console.log(entred.value)

console.log(dataEntred?.value?.description)
accommodition.value.description = dataEntred.value?.description[newValue] == undefined ? '' : dataEntred.value?.description[newValue]
accommodition.value.name = dataEntred.value?.name[newValue] == undefined ? '' : dataEntred.value?.name[newValue]
accommodition.value.address = dataEntred.value?.address[newValue] == undefined ? '' : dataEntred.value?.address[newValue]
accommodition.value.owner_info = dataEntred.value?.owner_info[newValue] == undefined ? '' : dataEntred.value?.owner_info[newValue]


console.log(accommodition)

}).catch((el)=>{
    error.value = el.response.data.errors

    console.log(error.value)

  })



} else {
  axios.defaults.headers.common['local'] = langSelected.value

  axios.post(`/api/flights/${dataEntred.value.id}/update`, body).then((res) => {
    error.value=[]

    entred.value = 1
    dataEntred.value = res.data.flight
    // toast.add({severity: 'success', summary: 'Successful', detail: 'Flight Created', life: 3000})

  }).catch((el)=>{
    error.value = el.response.data.errors

    console.log(error.value)

  })

}

})




const validation = () => {

  console.log(dataEntred.value)

  lang.value.forEach((elem) => {
    console.log(elem)
    if (dataEntred.value?.description[elem.value] == undefined || dataEntred.value?.name[elem.value] == undefined || dataEntred.value?.address[elem.value] == undefined || dataEntred.value?.owner_info[elem.value] == undefined) {

    }
  })

  onSubmit(langSelected)


}


watch(country_id, async (newValue, oldQuestion) => {
  console.log("hello ")
  axios.get(`/api/state/${newValue}`).then((res) => {

    states.value = res.data.states
    console.log(states.value)
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
// const mapping = computed(() => {
//       return catogary.value=""
//       // return catogary.value.map(item => {
//       //   // Example transformation: Make the item name uppercase
//       //   return {
//       //     ...item,
//       //     name: item.name.langSelected,

//       //   };
//       // });

//     });
    const mapping = () => {

      return catogary.value.map(item => {
        // Example transformation: Make the item name uppercase
        return {

        name:item.name.gb , id:item.id

        };
      });

};

onMounted((langSelected) => {


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

})

</script>

<style scoped>

</style>
