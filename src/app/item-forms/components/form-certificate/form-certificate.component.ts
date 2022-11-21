import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Subscription} from "rxjs";
import {Certificate} from "../../../public/models/certificate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificatesService} from "../../../public/services/certificates.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../public/services/user.service";
import {Tag} from "../../../public/models/tag";
import {ItemService} from "../../services/item.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-form-certificate',
  templateUrl: './form-certificate.component.html',
  styleUrls: ['./form-certificate.component.scss'], encapsulation: ViewEncapsulation.None
})

export class FormCertificateComponent implements OnInit {
  private subscription: Subscription;

  isAdminSubscription: Subscription;
  isAdmin: boolean;

  idCertificate: number;
  certificate: Certificate;
  selectedFile: ImageSnippet;
  inputTags: string[] = [];

  addCertificateFormGroup = new FormGroup({
      expire_in: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,10}')]),
      price: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,10}')]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      tags: new FormControl([''])
    }
  )

  constructor(private certificateService: CertificatesService, private formService: ItemService, private activateRoute: ActivatedRoute,
              private userService: UserService) {
    this.isAdmin = this.userService.isUserAdmin();

    this.subscription = activateRoute.params.subscribe(params => {
      this.idCertificate = params['id'];
      if (this.idCertificate !== undefined && this.isAdmin) {
        this.certificateService.get(this.idCertificate).subscribe((certificate) => {
          if (certificate !== undefined) {
            this.certificate = certificate;
            this.fillInputFields(this.certificate);
          }
        });
      }
    })
  }

  ngOnInit(): void {

  }

  fillInputFields(item: Certificate) {
    item["tags"].forEach(tag => {
      this.inputTags.push(tag["name"]);
    });
    this.addTagsToForm();

    (<HTMLFormElement>document.getElementById('expire_in')).value = item["duration"];
    (<HTMLFormElement>document.getElementById('price')).value = item["price"];
    (<HTMLFormElement>document.getElementById('coupon_name')).value = item["name"];
    (<HTMLFormElement>document.getElementById('brief_description')).value = item["description"];

    if (item["imagePath"] !== null) {
      (<HTMLFormElement>document.getElementById('output')).style.display = "block";
      (<HTMLFormElement>document.getElementById('output')).src = this.getImage(item["imagePath"]);
    }
  }

  addTagToForm(e: any) {
    this.inputTags.push(this.addCertificateFormGroup.get('tags')?.value?.slice(0, -1) as unknown as string);

    this.addCertificateFormGroup.get('tags')?.reset();
    this.addTagsToForm();

  }

  addTagsToForm() {
    this.resetTags();
    let tagContainer = document.getElementById("tag_container");
    this.inputTags.slice().reverse().forEach((tag) => {
      tagContainer?.prepend(this.createTag(tag));
    });
  }

  resetTags() {
    document.querySelectorAll('.tag').forEach(function (tag) {
      tag.parentElement?.removeChild(tag);
    });
  }

  createTag(label: any) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag')
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeBtn = document.createElement('i');
    closeBtn.setAttribute('class', 'material-icons');
    closeBtn.setAttribute('data-item', label);
    closeBtn.innerHTML = 'close';
    closeBtn.addEventListener('click', (e) => {
      this.deleteTag(e)
    });

    div.appendChild(span);
    div.appendChild(closeBtn);

    return div;
  }

  deleteTag(e: MouseEvent) {
    const value = (e.target as HTMLTextAreaElement).getAttribute('data-item');
    const index = this.inputTags?.indexOf(value as string);
    this.inputTags = [...this.inputTags.slice(0, index), ...this.inputTags.slice(index + 1)];
    this.addTagsToForm()
  }

  loadFile() {
    let preview = document.getElementById('output') as HTMLImageElement;
    const input = document.getElementById('image') as HTMLInputElement | null;
    if (input != null && input.files != null && preview != null) {
      let file = input.files[0];
      let reader = new FileReader();
      reader.onloadend = function () {
        if (typeof reader.result === "string") {
          preview.src = reader.result;
        }
      }
      if (file) {
        preview.style.display = "block";
        reader.readAsDataURL(file);
      } else {
        preview.style.display = "none";
        preview.src = "";
      }
    }
  }

  createFormData(formData: FormData, data: any) {
    for (let key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((obj: any, index: any) => {
          let keyList = Object.keys(obj);
          keyList.forEach((keyItem) => {
            let keyName = [key, "[", index, "]", ".", keyItem].join("");
            formData.append(keyName, obj[keyItem]);
          });
        });
      } else if (typeof data[key] === "object") {
        for (let innerKey in data[key]) {
          formData.append(`${key}.${innerKey}`, data[key][innerKey]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
  }


  addCertificate() {
    let formData = new FormData(document.getElementById('new_item_form') as HTMLFormElement);
    let tags: Tag[] = [];
    this.inputTags.forEach((tag) => {
      tags.push({name: tag});
    });
    formData.delete("tag_name");

    this.createFormData(formData, {tags: tags});
    let file = (document.getElementById('image') as HTMLFormElement).files[0];
    if (file === undefined) {
      file = new File([""], "");
    }
    formData.append("file", file);

    if (this.idCertificate === undefined) {
      this.postCertificate(formData);
    } else {
      this.updateCertificate(formData);
    }

    this.addCertificateFormGroup.reset();
    this.inputTags = [];
    this.addTagsToForm();
    if (<HTMLInputElement>document.getElementById("new_tag_input_name") !== null) {
      (<HTMLInputElement>document.getElementById("new_tag_input_name")).value = "";
    }
    (<HTMLInputElement>document.getElementById("image")).value = "";
    (<HTMLInputElement>document.getElementById("output")).style.display = "none";
  }

  postCertificate(formData: FormData) {
    this.formService.addCertificate(formData).subscribe(() => {
        this.setMessage("Certificate was added.");
      }, error => {
        this.setMessage("Certificate was not added.");
      }
    );
  }

  updateCertificate(formData: FormData) {
    this.formService.patch(formData, this.idCertificate).subscribe(() => {
        this.setMessage("Certificate was updated.");
      }, error => {
        this.setMessage("Certificate was not updated.");
      }
    );
  }

  getImage(imagePath: string) {
    let image = "../assets/grey_image.jpeg";
    if (imagePath !== null) {
      image = "http://127.0.0.1:8082" + imagePath;
    }
    return image;

  }

  ngAfterViewInit() {
    this.isAdminSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isAdmin = this.userService.isUserAdmin();
      if (!this.isAdmin) {
        if (this.idCertificate === undefined) {
          this.setMessage("You are not allowed to add a certificate.");
        } else {
          this.setMessage("You are not allowed to update the certificate.");
        }
      }
    })


  }

  setMessage(value: string) {
    (<HTMLElement>document.getElementById("new_item_message")).innerHTML = value;
  }

}
