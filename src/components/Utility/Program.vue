<template>
  <div>
    <v-dialog v-model="dialog" max-width="300px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Manage Program</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-text-field label="Program Name" v-model="editedItem.program_name"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex>
                <v-switch
                  :label="`Program Currently active: ${editedItem.program_is_active.toString()}`"
                  v-model="editedItem.program_is_active"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      class="elevation-10"
      :items="items"
      :headers="headers"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.program_name }}</td>
        <td class="text-xs-right">{{ props.item.program_is_active }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<style>

</style>
<script>
  import ProgramModel from '../../models/program'

  export default {
    data() {
      return {
        dialog:false,
        headers: ProgramModel.headers,
        items: [
          {
            program_name: 'Master of Science in Information Technology',
            program_is_active: true
          }
        ],
        editedItem: {
          program_name: "",
          program_is_active: false
        }
      }
    },
    methods:{
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    }
  }

</script>
