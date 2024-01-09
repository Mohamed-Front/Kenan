<script setup>
import {FilterMatchMode} from 'primevue/api'
import {ref, onMounted, onBeforeMount} from 'vue'
// import ProductService from '@/service/ProductService';
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {useRouter} from "vue-router";
const toast = useToast()
const router = useRouter()
const products = ref(null)
const loading = ref(true)
const user = ref({})
const error = ref('')
const users = ref(null)
const iid =ref("")
const productDialog = ref(false)
const deleteDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref(null)
const dt = ref(null)
import moment from 'moment'
const filters = ref({})
const submitted = ref(false)
const rate = ref({
    tourist_rating:Number,
    reviewable_id:'',
    type:1
})
const statuses = ref([
  {label: 'INSTOCK', value: 'instock'},
  {label: 'LOWSTOCK', value: 'lowstock'},
  {label: 'OUTOFSTOCK', value: 'outofstock'},
])

// const productService = new ProductService();

onBeforeMount(() => {
  initFilters()
})

 const fetchData= ()=>{


  axios.get("/api/v1/reviews").then((res)=>{
    loading.value= false
    users.value= res.data.data
    console.log(users.value)

  });


}

const deletecountry =(id)=>{
  iid.value=id
  deleteProductsDialog.value=true
}


onMounted(() => {
  // productService.getProducts().then((data) => (products.value = data));
fetchData()

})



const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}

const save = () => {
  submitted.value = true
  if (!user.value.first_name || !user.value.last_name || !user.value.email || !user.value.mobile_number)
    return


    if (user.value.id) {
      axios
        .post(`/api/users/${user.value.id}/update`,user.value)
        .then((res) => {
          console.log(res.data)
          fetchData()
          toast.add({severity: 'success', summary: 'Successful', detail: 'user updated', life: 3000})
        })
        .catch(() => {})
      toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000})
    } else {
      axios
        .post('/api/users/create',user.value)
        .then((res) => {
          console.log(res.data)
          fetchData()
          toast.add({severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000})
        })
        .catch(() => {})

    }
    productDialog.value = false
    user.value = {}
}

const edit = (edit) => {
  user.value = {...edit}
  productDialog.value = true
}

const getSeverity = (product) => {

  switch (product.status) {
    case 1:
      return 'success';

    case -1:
      return 'warning';

    case 0:
      return 'danger';

    default:
      return null;
  }
};

const confirmDelete = (id) => {

  error.value = ref('')
  rate.value.reviewable_id=id
  deleteDialog.value = true
}

const deleteAction = () => {
  axios
    .delete(`/api/users/${user.value.id}/delete`)
    .then((res) => {
      console.log(res.data)
      deleteDialog.value=false
      fetchData()
      toast.add({severity: 'success', summary: 'Successful', detail: 'user deleted', life: 3000})
    })
    .catch(() => {})

}






const exportCSV = () => {
  dt.value.exportCSV()
}


const deleteSelectedProducts = () => {

  axios.delete(`/api/v1/reviews/${iid.value}`).then((res) => {
    deleteProductsDialog.value=true
    fetchData()
      toast.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000})

    })

}

const initFilters = () => {
  filters.value = {
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  }
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <va-card class="card">
        <Toolbar class="mb-4">
          <template #start>
            <div class="my-2">
<!--              <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"/>-->
<!--              <Button-->
<!--                label="Delete"-->
<!--                icon="pi pi-trash"-->
<!--                class="p-button-danger"-->
<!--                :disabled="!selectedProducts || !selectedProducts.length"-->
<!--                @click="confirmDeleteSelected"-->
<!--              />-->
            </div>
          </template>

          <template #end>
<!--            <FileUpload-->
<!--              mode="basic"-->
<!--              accept="image/*"-->
<!--              :max-file-size="1000000"-->
<!--              label="Import"-->
<!--              choose-label="Import"-->
<!--              class="mr-2 inline-block"-->
<!--            />-->
            <Button label="Export" icon="pi pi-upload" class="new" @click="exportCSV($event)"/>
          </template>
        </Toolbar>

        <Toast/>


        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :value="users"
          :loading="loading"
          data-key="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rows-per-page-options="[5, 10, 25]"
          current-page-report-template="Showing {first} to {last} of {totalRecords} products"
          responsive-layout="scroll"
        >
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-between md:align-items-center">
              <h5 class="m-0">Manage Reviews</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Search..."/>
              </span>
            </div>
          </template>

          <Column selection-mode="multiple" header-style="width: 3rem"></Column>
          <Column field="title" header="title" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.title }}
            </template>
          </Column>
         

         


           <Column field="rate" header="Rate" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Rating @click="confirmDelete(slotProps.data.id)" :modelValue="slotProps.data.ratings"  :cancel="false" />
            </template>
          </Column>
          <Column field="create time" header="Create time" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{   moment(slotProps.data.createdAt).format('DD-MM-YYYY')}}
            </template>
          </Column>
          <Column header-style="min-width:10rem;">
            <template #body="slotProps">
             
              <Button
                icon="pi pi-trash"
                class="delete mt-2"
                @click="deletecountry(slotProps.data?.id)"
              />

            </template>
          </Column>

          

        
          <Column header-style="min-width:10rem;">
            <template #body="slotProps">
             
            </template>
          </Column>

<!--          <Column header="Image" header-style="width:14%; min-width:10rem;">-->
<!--            <template #body="slotProps">-->
<!--              <span class="p-column-title">Image</span>-->
<!--              <img-->
<!--                :src="'demo/images/product/' + slotProps.data.image"-->
<!--                :alt="slotProps.data.image"-->
<!--                class="shadow-2"-->
<!--                width="100"-->
<!--              />-->
<!--            </template>-->
<!--          </Column>-->

        </DataTable>

     

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts"/>
          </template>
        </Dialog>
      </va-card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
