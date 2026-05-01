import Swal from 'sweetalert2'

export const showAlert = async() => {
    const result = await Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})

return result

    
}

export const confirmAction =async  ()=> {
    Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });

}

export const errorAlert = () => {
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});
}