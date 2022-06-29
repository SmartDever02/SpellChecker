#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]

extern crate rocket;
extern crate rocket_cors;

use spellcheck::get_suggestions;

// custom modules
mod cors;
mod spellcheck;

#[get("/")]

fn index() -> &'static str {
    "Hello, world!"
}

#[get("/api/spellcheck/<word>")]

fn myrocket(word: String) -> String {
    get_suggestions(word)
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
    .mount("/", routes![index, myrocket])
    .attach(cors::make_cors())
}

fn main() {
rocket().launch();
}