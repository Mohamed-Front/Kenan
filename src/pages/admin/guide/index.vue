<script setup>
import {FilterMatchMode} from 'primevue/api'
import {ref, onMounted, onBeforeMount} from 'vue'
// import ProductService from '@/service/ProductService';
import {useToast} from 'primevue/usetoast'
import axios from "axios";

const toast = useToast()

const products = ref(null)
const loading = ref(true)
const user = ref({
  name:'',
  permissions:[]
})
const users = ref([])
const roles = ref([])
const updateDialog=ref(false)
const productDialog = ref(false)
const deleteDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref(null)
const dt = ref(null)
const filters = ref({})
const submitted = ref(false)
const selectedCities = ref([]);
const delete_id =ref(Number)
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
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


  axios.get("/api/v1/admin/users/tour-guide-requests").then((res)=>{
    loading.value= false
    roles.value= res.data.data

  });

}

onMounted(() => {

  // productService.getProducts().then((data) => (products.value = data));
fetchData()

})
const formatCurrency = (value) => {
  return value.toLocaleString('gb-US', {style: 'currency', currency: 'USD'})
}

const openNew = () => {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}

const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}
const update =()=>{

  axios.post(`/api/roles/update/${delete_id.value}`,user.value).then((res)=>{
  });
}


const save = () => {
  const body = new FormData();
   console.log(selectedCities.value)
  body.append("name",user.value.name)
  body.append("permissions",selectedCities.value)

  axios
    .post('api/roles/create',user.value)
    .then((res) => {
      fetchData()
      productDialog.value=!(productDialog.value)

      toast.add({severity: 'success', summary: 'Successful', detail: 'role create', life: 3000})
    })
    .catch((el)=>{
      console.log(el)

    })
}


const edit = (id) => {
  loading.value= true
  axios.put(`/api/v1/admin/users/tour-guide-requests/approve/${id}`).then((res)=>{
    fetchData()
    loading.value= false
  });

}

const confirmDelete = (id) => {
  loading.value= true
  axios.put(`/api/v1/admin/users/tour-guide-requests/reject/${id}`).then((res)=>{
    fetchData()
    loading.value= false
  });

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

const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }
  return index
}

const createId = () => {
  let id = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

const exportCSV = () => {
  dt.value.exportCSV()
}

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = () => {

axios.post(`api/roles/delete/${delete_id.value}`)
fetchData()
deleteProductsDialog.value=false
toast.add({severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 3000})
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
              <!-- <Button label="New" icon="pi pi-plus" class="new mr-2" @click="openNew"/> -->
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
          :value="roles"
          :loading="loading"
          data-key="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rows-per-page-options="[5, 10, 25]"
          current-page-report-template="Showing {first} to {last} of {totalRecords} "
          responsive-layout="scroll"
        >
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-between md:align-items-center">
              <h5 class="m-0">Manage tours</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Search..."/>
              </span>
            </div>
          </template>

          <Column selection-mode="multiple" header-style="width: 3rem"></Column>
          <Column field="fullName" header="fullName" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
          </Column>

          <Column field="status" header="status" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.requestStatus }}
            </template>
          </Column>
          <Column field="email" header="email" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
          <Column field="city" header="city" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.city }}
            </template>
          </Column>
          <Column field="phoneNumber" header="phoneNumber" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.phoneNumber }} $
            </template>
          </Column>
          <Column field="language" header="language" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.language }} $
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

          <Column header-style="min-width:10rem;">
            <template #body="slotProps">
              <Button
              label="approve"
              style="background-color:green !important"
                class="delete mr-2"
                @click="edit(slotProps.data._id)"
              />
              <Button
              label="reject"

                class="delete mt-2"
                @click="confirmDelete(slotProps.data._id)"
              />
            </template>
          </Column>

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

        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '450px' }"
          header="Create roles"
          :modal="true"
          class="p-fluid"
        >

          <div class="field mb-5">
            <label for="last">Name </label>
            <InputText
              class="mt-3"
              id="last"
              v-model.trim="user.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.last_name }"
            />
            <small v-if="submitted && !user.last_name" class="p-invalid">Last Name is required.</small>
          </div>
          <div class="card flex justify-content-center">
            <MultiSelect v-model="user.permissions" display="chip"  option-value="id"  :options="users" optionLabel="name" placeholder="Select Permissions"
              class="w-full md:w-20rem" />
           </div>



          <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="save"/>
          </template>
        </Dialog>

        <Dialog v-model:visible="updateDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">


          <div class="field mb-5">
            <label for="last">Name </label>
            <InputText
              class="mt-3 w-full"
              id="last"
              v-model.trim="user.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.last_name }"
            />
          </div>
          <div class="card flex justify-content-center">
            <MultiSelect v-model="user.permissions" option-value="id" :options="users" optionLabel="name" placeholder="Select roles"
              class="w-full md:w-20rem" />
           </div>



          <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="update"/>
          </template>
        </Dialog>


      </va-card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

