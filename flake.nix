{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            android_sdk.accept_license = true;
            allowUnfree = true;
          };
        };
        androidComposition = pkgs.androidenv.composeAndroidPackages {
          cmdLineToolsVersion = "11.0";
          toolsVersion = "26.1.1";
          platformToolsVersion = "34.0.4";
          buildToolsVersions = ["34.0.0"];
          includeEmulator = true;
          emulatorVersion = "32.1.14";
          platformVersions = ["34"];
          includeSources = false;
          includeSystemImages = true;
          systemImageTypes = ["google_apis_playstore"];
          abiVersions = ["x86_64"];
          cmakeVersions = [];
          includeNDK = false;
          useGoogleAPIs = false;
          useGoogleTVAddOns = false;
          includeExtras = [];
          extraLicenses = [
            "android-sdk-preview-license"
            "android-googletv-license"
            "android-sdk-arm-dbt-license"
            "google-gdk-license"
            "intel-android-extra-license"
            "intel-android-sysimage-license"
            "mips-android-sysimage-license"
          ];
        };
        androidsdk = androidComposition.androidsdk;
      in
        with pkgs; {
          devShells.default =
            mkShell
            {
              buildInputs = [
                androidsdk
                jdk17
                nodejs
              ];
              ANDROID_SDK_ROOT = "${androidsdk}/libexec/android-sdk";
              LD_LIBRARY_PATH = "${pkgs.libglvnd}/lib";
              PATH = "$PATH:$HOME/.npm-global";
            };
        }
    );
}
