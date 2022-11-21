import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Subscription} from "rxjs";
import {TagService} from "../../../public/services/tag.service";
import {UserService} from "../../../public/services/user.service";
import {Tag} from "../../../public/models/tag";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-form-tag',
  templateUrl: './form-tag.component.html',
  styleUrls: ['./form-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormTagComponent implements OnInit {
  eventSubscription: Subscription;
  isAdmin: boolean;

  constructor(private tagService: ItemService, private userService: UserService) {
    this.isAdmin = this.userService.isUserAdmin();
  }

  ngOnInit(): void {
  }

  addTag(event: Event) {
    event.preventDefault();
    let formData = new FormData(<HTMLFormElement>document.getElementById('new_tag_form'));
    let file = (<HTMLFormElement>document.getElementById('tag_image')).files[0];
    if (file === undefined) {
      file = new File([""], "");
    }
    formData.append("file", file);
    let customHeaders = new Headers();
    customHeaders.append('Authorization', `Bearer_${sessionStorage.getItem("access_token")}`);
    this.tagService.add(formData).subscribe((result: Tag) => {
        this.setMessage("New tag was added.");
      }, error => {
        this.setMessage("New tag was not added.");
      }
    );
    this.clearFields();
  }

  loadFile() {
    let preview = document.getElementById('tag_output') as HTMLImageElement;
    const input = document.getElementById('tag_image') as HTMLInputElement | null;
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

  clearFields() {
    (<HTMLInputElement>document.getElementById("new_tag_input_name")).value = "";
    (<HTMLInputElement>document.getElementById("tag_image")).value = "";
    (<HTMLInputElement>document.getElementById("tag_output")).style.display = "none";
  }


  ngAfterViewInit() {
    this.eventSubscription = this.userService.isLoggedInSubject.subscribe(() => {
      this.isAdmin = this.userService.isUserAdmin();
      if (!this.isAdmin) {
        this.setMessage("You are not allowed to add a tag.");
      }
    })
  }

  setMessage(value: string) {
    (<HTMLInputElement>document.getElementById("new_tag_message")).innerHTML = value;
  }

}
