import Toastr from 'toastr';

const config = {
  preventDuplicates: true,
  closeButton: true,
  progressBar: true
}

const { options } = Toastr;

Toastr.options = { ...options, ...config }

export { Toastr };
