use rocket::http::Method;
use rocket_cors::{
  AllowedHeaders, AllowedOrigins,
  Cors, CorsOptions
};

pub fn make_cors() -> Cors {
  let allowed_origins = AllowedOrigins::some_exact(&[ // 4.
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:8000",
      "http://0.0.0.0:8000",
  ]);
  CorsOptions { // 5.
    allowed_origins,
    allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(), // 1.
    allowed_headers: AllowedHeaders::some(&[
        "Authorization",
        "Accept",
        "Access-Control-Allow-Origin", // 6.
    ]),
    allow_credentials: true,
    ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}
