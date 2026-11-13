package com.barangay.drrm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "evacuation_centers")
public class EvacuationCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "estimated_max_capacity", nullable = false)
    private Integer estimatedMaxCapacity;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    public EvacuationCenter() {
    }

    public EvacuationCenter(String name, String address, Integer estimatedMaxCapacity,
                            String status, Double latitude, Double longitude) {
        this.name = name;
        this.address = address;
        this.estimatedMaxCapacity = estimatedMaxCapacity;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getEstimatedMaxCapacity() {
        return estimatedMaxCapacity;
    }

    public void setEstimatedMaxCapacity(Integer estimatedMaxCapacity) {
        this.estimatedMaxCapacity = estimatedMaxCapacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
